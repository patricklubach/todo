const lol = new Map();

lol.set("foo", "bar");

console.log(lol);
console.log(JSON.stringify(lol));

class Task {
  constructor(title, description = "") {
    this.id = crypto.randomUUID().slice(0, 8);
    this.title = title;
    this.description = description;
  }
}

const task = new Task("foo", "lsadjfdsofj");

console.log(task);
console.log(JSON.stringify(task));
console.log(task.toString());
