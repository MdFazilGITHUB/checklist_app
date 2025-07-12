# 🛠️ Task & Subtask Manager (Fullstack App)

A fullstack application built with **React** (frontend) and **Node.js + Express + Mongoose** (backend) for managing tasks and their subtasks. Task weight is auto-calculated based on subtask weights, and the form can only be submitted when the total weight across all tasks equals exactly 100%.

---

## Features

- Add multiple tasks and subtasks dynamically.
- Automatically calculate each task's weight from its subtasks.
- Prevent form submission unless total task weight = 100%.
- Live form validation with editable subtasks and auto-updating task weights.
- Connects to MongoDB to fetch and store task data.

---

## Tech Stack

- **Frontend:** React, Axios, CSS
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB

---

## API Endpoints

- `GET  /get` – Fetch all tasks and subtasks
- `POST /add` – Add a new set of tasks and subtasks

Note: Edit and Delete functionality for tasks/subtasks via API is **not implemented**.

## Submit Validation

- Each task’s weight is **calculated automatically** from subtasks.
- Submit button is **disabled** until the total weight of all tasks equals **100%**.


