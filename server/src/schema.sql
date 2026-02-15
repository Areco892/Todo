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

CREATE TABLE workout(
    workout_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    image VARCHAR(255),
    description VARCHAR(255)
);