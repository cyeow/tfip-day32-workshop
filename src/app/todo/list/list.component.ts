import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from 'src/app/model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input()
  todoList: Todo[] = [];

  @Output()
  onEditTodo = new Subject<Todo>();
  
  ngOnInit() {
    
  }

  removeTodo(i: number) {
    this.todoList.splice(i, 1);
  }

  editTodo(i: number) {
    this.onEditTodo.next(this.todoList[i]);
  }
}
