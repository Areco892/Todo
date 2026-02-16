CREATE DATABASE gadget;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    status VARCHAR(255)
);

CREATE TABLE timer(
    timer_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    time VARCHAR(8)
);

CREATE TABLE exercise(
    eid SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    description TEXT
);

CREATE TABLE workout(
    wid SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    duration INTEGER
);

CREATE TABLE workout_exercise(
    id SERIAL PRIMARY KEY,
    wid INTEGER NOT NULL,
    eid INTEGER NOT NULL,
    sets INTEGER,
    weight INTEGER,
    reps INTEGER,
    

    FOREIGN KEY (wid) REFERENCES workout(wid) ON DELETE CASCADE,
    FOREIGN KEY (eid) REFERENCES exercise(eid) ON DELETE CASCADE,
    UNIQUE (wid, eid)
);
