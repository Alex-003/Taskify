# Taskify

Taskify is a simple todo list application built with React using Vite. 

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Sort tasks by name or reverse alphabetical order
- Accessibility options for dyslexic and colorblind users

## How to Use

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Start the development server using `npm run dev`.
4. Open your web browser and navigate to `http://localhost:3000`.


## Code Explanation

### Dependencies

- `react` and `react-dom`: Required for building React components and rendering them in the browser.
- `react-scripts`: A set of scripts for building and testing React apps.

### State

The app uses the `useState` hook to manage the following state variables:

- `todos`: An array of todo objects, each with a `task` and `completed` property.
- `input`: The value of the input field used for adding new todos.
- `editTodoIndex`: The index of the todo being edited.
- `editTodoValue`: The value of the input field used for editing a todo.
- `sortBy`: The current sort method ("name" or "reverse").
- `dyslexicMode`: Whether dyslexic mode is enabled or not.
- `colorblindMode`: Whether colorblind mode is enabled or not.

### Functions

The app uses the following functions:

- `addTodo`: Adds a new todo to the `todos` array.
- `deleteTodo`: Removes a todo from the `todos` array.
- `saveEditTodo`: Saves the edited todo to the `todos` array.
- `cancelEditTodo`: Cancels the editing of a todo.
- `sortByKey`: Sorts the `todos` array based on the selected sort method.
- `dyslexia`: Toggles dyslexic mode.
- `colorblind`: Toggles colorblind mode.

### Effects

The app uses the `useEffect` hook to manage the following side effects:

- Saving and retrieving the `todos`, `dyslexicMode`, and `colorblindMode` state variables to and from `localStorage`.
- Setting the initial values of the `todos`, `dyslexicMode`, and `colorblindMode` state variables based on their saved values in `localStorage`.
