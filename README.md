# Todo App

A fullstack todo web application that I ever wanted and hopefully create.

## Features

- duplicate task
- edit task
- Task text formatting
- store todos in different backends (e.g. sqlite, json file, etc.)
- task markdown support
- links in separate section
- deadline with date selector
- deadline progress bar
- priority
- pre-defined priority colors
- dictate function
- tags
- alerts based on deadline and/or time range from now to deadline (e.g. through telegram or http hook)
- switch between simple and advanced mode
- Archive for archived and/or finished or deleted todos
- CLI tool for managing todos from terminal
- Mutliple todo lists
- CLI support
- searchable tasks
- meta information (task counter, created_at, updated_at, etc)
- REST API for managing todos

## Usage

To use the todo app, run:

```bash
node index.js
```

or open the `public` directory using the live server extension in vscode.

## Todo

- [x] display todos sorted by createdAt
- [x] Add new todo
  - [x] Add todo: quick mode
  - [x] Add todo: advanced mode with modal box
- [x] Delete todo
- [x] make todos persistent (e.g. through localStorage)
- [ ] store todos in backend (e.g. sqlite)
- [ ] add possibility to duplicate task
- [ ] make tasks editable
- [x] Mark todo as done / Strike through todo when done
- [x] Task text formatting
- [ ] Add sidepanel for multiple todo lists
- [ ] Add possibility to create multiple todo lists
- [ ] links in separate section
- [ ] deadline with date selector
- [ ] deadline progress bar
- [ ] priority
- [ ] pre-defined priority colors
- [ ] dictate function
- [ ] tags
- [ ] alerts based on deadline and/or time range from now to deadline (e.g. through telegram or http hook)
- [ ] add meta information to tasks (created_at, updated_at)
- [ ] add task counter at bottom of page
- [ ] make meta information visible
- [ ] add CLI support
- [ ] add searching and filtering tasks
- [ ] add archive for archived and/or finished or deleted todos
- [ ] add switch between simple and advanced mode
- [ ] add REST API for managing todos
