data = {
  tasklists: {
    absd1234: {
      id: "absd1234",
      name: "default",
      createdAt: "2024-06-01T12:00:00.000Z",
      editMode: false,
      tasks: [
        {
          id: "task1234",
          text: "Task 1",
          createdAt: "2024-06-01T12:00:00.000Z",
          editMode: false,
          done: false,
          links: [
            "https://google.com",
            "https://stackoverflow.com",
            "https://daily.dev",
          ],
          tags: ["work", "urgent"],
        },
      ],
    },
  },
};

class Storage {
  static saveTaskList(taskList) {
    console.log(`Saving task list "${taskList.name}" with id "${taskList.id}"`);
    localStorage.setItem(taskList.id, JSON.stringify(taskList));
  }

  static loadTaskList(id) {
    const data = JSON.parse(localStorage.getItem(id));
    console.log(`Loading task list with id "${id}"`);

    const taskList = Object.assign(new TaskList(), data);
    return taskList;
  }

  static loadAllTaskLists() {
    console.log("Loading all task lists");
    const taskLists = [];
    for (let i = 0; i < localStorage.length; i++) {
      let id = localStorage.key(i);
      let taskList = this.loadTaskList(id);
      taskLists.push(taskList);
    }
    return taskLists;
  }

  static deleteTaskList(id) {
    localStorage.removeItem(id);
    console.log(`Deleted task list with id "${id}"`);
  }
}
