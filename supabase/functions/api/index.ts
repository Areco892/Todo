// @ts-ignore Deno resolves URL imports in Supabase Edge Functions.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
  serve(handler: (req: Request) => Response | Promise<Response>): void;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function text(body: string, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function routeParts(req: Request) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const apiIndex = parts.lastIndexOf("api");
  const route = apiIndex >= 0 ? parts.slice(apiIndex + 1) : parts;

  return { url, route };
}

async function readBody(req: Request) {
  if (req.method === "GET" || req.method === "DELETE") {
    return {};
  }

  return await req.json();
}

function throwIfError(error: unknown) {
  if (error) {
    throw error;
  }
}

async function getExercises(url: URL) {
  const difficulty = url.searchParams.get("difficulty") || "All";
  const target = url.searchParams.get("target") || "All";

  let query = supabase.from("exercise").select("*");

  if (difficulty !== "All") {
    query = query.eq("difficulty", difficulty);
  }

  if (target !== "All") {
    query = query.eq("target", target);
  }

  const { data, error } = await query.order("eid");
  throwIfError(error);

  return json(data ?? []);
}

async function createExercise(req: Request) {
  const { name, image, target, difficulty } = await readBody(req);
  const { data, error } = await supabase
    .from("exercise")
    .insert({ name, image, target, difficulty })
    .select()
    .single();

  throwIfError(error);

  return json({ rows: [data] });
}

async function updateExercise(req: Request, id: string) {
  const { name, image, target, difficulty } = await readBody(req);
  const { error } = await supabase
    .from("exercise")
    .update({ name, image, target, difficulty })
    .eq("eid", id);

  throwIfError(error);

  return json({ message: "Exercise was updated!" });
}

async function deleteExercise(id: string) {
  const { error } = await supabase.from("exercise").delete().eq("eid", id);
  throwIfError(error);

  return json({ message: "Exercise was deleted!" });
}

async function addExercise(req: Request) {
  const { wid, eid, sets, weight, reps } = await readBody(req);
  const { error } = await supabase
    .from("workout_exercise")
    .insert({ wid, eid, sets, weight, reps });

  throwIfError(error);

  return text("Exercise was added successfully!");
}

async function getWorkouts() {
  const { data, error } = await supabase
    .from("workout")
    .select("*")
    .order("created_at");

  throwIfError(error);

  return json(data ?? []);
}

async function getWorkoutExercises(workoutId: string, includeExerciseDetails: boolean) {
  const { data: workout, error: workoutError } = await supabase
    .from("workout")
    .select("wid")
    .eq("wid", workoutId)
    .maybeSingle();

  throwIfError(workoutError);

  if (!workout) {
    return json({ message: "Workout not found!" }, 404);
  }

  const selectColumns = includeExerciseDetails
    ? "sets, weight, reps, exercise(eid, name, image, description, target, difficulty)"
    : "sets, weight, reps, exercise(eid, name)";

  const { data, error } = await supabase
    .from("workout_exercise")
    .select(selectColumns)
    .eq("wid", workoutId)
    .order("eid");

  throwIfError(error);

  const exercises = (data ?? []).map((row: any) => {
    const exercise = Array.isArray(row.exercise) ? row.exercise[0] : row.exercise;

    return {
      ...exercise,
      sets: row.sets,
      weight: row.weight,
      reps: row.reps,
    };
  });

  return json(exercises);
}

async function createWorkout(req: Request) {
  const { name } = await readBody(req);
  const { data, error } = await supabase
    .from("workout")
    .insert({ name })
    .select()
    .single();

  throwIfError(error);

  return json(data);
}

async function updateWorkout(req: Request, workoutId: string) {
  const { name } = await readBody(req);
  const { data, error } = await supabase
    .from("workout")
    .update({ name })
    .eq("wid", workoutId)
    .select("wid");

  throwIfError(error);

  if (!data?.length) {
    return json({ message: "Workout not found!" }, 404);
  }

  return text("Workout was updated!");
}

async function deleteWorkout(workoutId: string) {
  const { data, error } = await supabase
    .from("workout")
    .delete()
    .eq("wid", workoutId)
    .select("wid");

  throwIfError(error);

  if (!data?.length) {
    return json({ message: "Workout not found!" }, 404);
  }

  return json({ message: "Workout was deleted!" });
}

async function deleteWorkoutExercise(workoutId: string, exerciseId: string) {
  const { data, error } = await supabase
    .from("workout_exercise")
    .delete()
    .eq("wid", workoutId)
    .eq("eid", exerciseId)
    .select("id");

  throwIfError(error);

  if (!data?.length) {
    return json({ message: "Exercise was not found!" }, 404);
  }

  return json({ message: "Exercise was deleted!" });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { url, route } = routeParts(req);
    const [resource, id, childId] = route;

    if (resource === "exercises") {
      if (req.method === "GET" && !id) return await getExercises(url);
      if (req.method === "POST" && !id) return await createExercise(req);
      if (req.method === "POST" && id === "add") return await addExercise(req);
      if (req.method === "PUT" && id) return await updateExercise(req, id);
      if (req.method === "DELETE" && id) return await deleteExercise(id);
    }

    if (resource === "workoutplans") {
      if (req.method === "GET" && !id) return await getWorkouts();
      if (req.method === "POST" && !id) return await createWorkout(req);
      if (req.method === "GET" && id && !childId) return await getWorkoutExercises(id, false);
      if (req.method === "PUT" && id && !childId) return await updateWorkout(req, id);
      if (req.method === "DELETE" && id && !childId) return await deleteWorkout(id);
      if (req.method === "DELETE" && id && childId) return await deleteWorkoutExercise(id, childId);
    }

    if (resource === "workouts") {
      if (req.method === "GET" && id) return await getWorkoutExercises(id, true);
    }

    return json({ message: "Route not found." }, 404);
  } catch (error) {
    console.error(error);
    return json(error, 500);
  }
});
