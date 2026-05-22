# Workout Planner Supabase API

This Edge Function replaces the old Express API for the deployed app.

Deploy it with:

```sh
supabase login
supabase link --project-ref utpusdepzircoqljljxr
supabase functions deploy api
```

The deployed base URL is:

```txt
https://utpusdepzircoqljljxr.supabase.co/functions/v1/api
```

For local testing:

```sh
supabase functions serve api --no-verify-jwt
```
