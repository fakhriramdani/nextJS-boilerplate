import type { Todo } from "./Todo";

/**
 * Port (interface). Infrastructure merealisasikan ini.
 * application mengimpor ini (boleh) karena ia didefinisikan di domain.
 */
export interface TodoRepository {
  listTodos(): Todo[];
  createTodo(title: string): Todo;
}
