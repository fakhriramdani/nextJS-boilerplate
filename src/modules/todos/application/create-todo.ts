import { TodoValidationError } from "../domain/errors";
import type { Todo } from "../domain/Todo";
import type { TodoRepository } from "../domain/TodoRepository";

export interface CreateTodoDependencies {
  readonly repository: TodoRepository;
}

/**
 * Use case: create a todo.
 * Input validation stays at the boundary (Zod); this enforces the domain rule
 * where the entity-level check cannot be bypassed.
 */
export const createTodo = ({
  repository,
  title,
}: {
  readonly repository: TodoRepository;
  readonly title: string;
}): Todo => {
  if (typeof title !== "string" || title.trim().length === 0) {
    throw new TodoValidationError("Title wajib diisi.");
  }
  if (title.length < 1 || title.length > 100) {
    throw new TodoValidationError("Title harus berisi 1–100 karakter.");
  }

  return repository.createTodo(title.trim());
};
