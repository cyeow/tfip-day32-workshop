export interface Task {
    itemName: string;
    priority: number;
    dueDate: Date;
}

export interface Todo {
    id: number;
    title: string;
    name: string;
    taskList: Task[];
}