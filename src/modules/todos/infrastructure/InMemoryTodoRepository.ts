import { Todo } from "../domain/Todo";
import type { TodoRepository } from "../domain/TodoRepository";

/**
 * In-memory repository. For the demo it is a process-scoped singleton so that
 * state survives across requests (a fresh instance per request would lose data).
 */
export class InMemoryTodoRepository implements TodoRepository {
  private readonly todos = new Map<string, Todo>();
  private nextId = 1;

  listTodos(): Todo[] {
    return Array.from(this.todos.values());
  }

  createTodo(title: string): Todo {
    const todo = Todo.create(title, String(this.nextId++));
    this.todos.set(todo.id, todo);
    return todo;
  }
}
