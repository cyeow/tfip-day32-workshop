import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Task, Todo } from 'src/app/model';

@Component({
  selector: 'app-add-todo-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class ItemComponent implements OnInit, OnChanges {
  @Input()
  currentTodo!: Todo;

  todoForm!: FormGroup;
  taskArray!: FormArray;

  titleField: string = 'title';
  nameField: string = 'name';
  taskListField: string = 'taskList';
  itemNameField: string = 'itemName';
  priorityField: string = 'priority';
  dueDateField: string = 'dueDate';

  @Output()
  onAddTodo = new Subject<Todo>();

  constructor(private fb: FormBuilder) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.todoForm = this.editForm();
  }

  ngOnInit() {
    this.todoForm = this.createForm();
  }

  createForm(): FormGroup {
    this.taskArray = this.fb.array([]); //new FormArray<any>([]);
    return new FormGroup({
      [this.nameField]: this.fb.control<string>(''),
      [this.titleField]: this.fb.control<string>(''),
      [this.taskListField]: this.taskArray
    })
  }

  editForm(): FormGroup {
    this.taskArray = this.fb.array([]);
    this.currentTodo.taskList.forEach(todo => this.taskArray.push(this.fb.group(todo)));

    return new FormGroup({
      [this.nameField]: this.fb.control<string>(this.currentTodo.name),
      [this.titleField]: this.fb.control<string>(this.currentTodo.title),
      [this.taskListField]: this.taskArray
    })
  }

  addTodoItem() {
    this.taskArray.push(
      this.createTodoItem()
    );
  }

  removeTodoItem(i: number) {
    this.taskArray.removeAt(i);
  }

  createTodoItem(): FormGroup {
    return this.fb.group({
      [this.itemNameField]: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
      [this.priorityField]: this.fb.control(1),
      [this.dueDateField]: this.fb.control(new Date())
    })
  }

  processForm() {
    let todo: Todo = this.todoForm.value;
    todo.id = Date.now();
    this.onAddTodo.next(todo);
    this.todoForm = this.createForm();
  }
}
