import { InMemoryTodoRepository } from "./infrastructure/InMemoryTodoRepository";
import { createTodo as createTodoUseCase } from "./application/create-todo";
import { listTodos as listTodosUseCase } from "./application/list-todos";
export type { TodoRepository } from "./domain/TodoRepository";
export type { Todo } from "./domain/Todo";
export { InMemoryTodoRepository };

// Composed feature module (light composition root).
interface TodosModule {
  listTodos: () => import("./domain/Todo").Todo[];
  createTodo: (title: string) => import("./domain/Todo").Todo;
}

// Eager singleton so in-memory state survives across requests.
const repository = new InMemoryTodoRepository();
const moduleInstance: TodosModule = {
  listTodos: () => listTodosUseCase({ repository }),
  createTodo: (title: string) => createTodoUseCase({ repository, title }),
};

export const listTodos = moduleInstance.listTodos;
export const createTodo = moduleInstance.createTodo;
export const inMemoryTodoRepository = repository;
