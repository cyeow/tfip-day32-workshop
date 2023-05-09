import { Component } from '@angular/core';
import { Todo } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day32-workshop';

  todoList: Todo[] = [];
  currentTodo!: Todo;

  constructor() {

  }

  addTodo(todo: Todo) {
    let i: number = this.todoList.findIndex(t => t.id === todo.id);
    if (i > 0) {
      this.todoList[i] = todo;
    } else {
      this.todoList.push(todo);
    }
  }

  editTodo(todo: Todo) {
    this.currentTodo = todo;
  }
}
