import type { Todo } from "../domain/Todo";
import type { TodoRepository } from "../domain/TodoRepository";

export interface ListTodosDependencies {
  readonly repository: TodoRepository;
}

/**
 * Use case: list all todos.
 * Dependency injected via params (no container/factory).
 */
export const listTodos = ({ repository }: ListTodosDependencies): Todo[] => {
  return repository.listTodos();
};
