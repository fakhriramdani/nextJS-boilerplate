import { TodoValidationError } from "./errors";

export interface TodoProps {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
  readonly createdAt: Date;
}

/**
 * Aggregate root.
 * - title wajib diisi (baris 17), panjang 1–100 (baris 18) ditegakkan di domain.
 * - instance hanya dibuat lewat `Todo.create` (kemungkinan valid).
 */
export class Todo {
  public readonly id: string;
  public readonly title: string;
  public readonly completed: boolean;
  public readonly createdAt: Date;

  private constructor(props: TodoProps) {
    this.id = props.id;
    this.title = props.title;
    this.completed = props.completed;
    this.createdAt = props.createdAt;
  }

  static create(title: string, id?: string): Todo {
    if (typeof title !== "string" || title.trim().length === 0) {
      throw new TodoValidationError("Title wajib diisi.");
    }
    if (title.length < 1 || title.length > 100) {
      throw new TodoValidationError("Title harus berisi 1–100 karakter.");
    }

    return new Todo({
      id: id ?? crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
    });
  }
}
