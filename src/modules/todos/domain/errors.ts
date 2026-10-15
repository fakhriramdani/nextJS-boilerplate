/**
 * Domain error contract.
 * The domain does NOT import shared errors: `code` + `message` are the only
 * fields the boundary layer ever reads (and they are safe to surface).
 */
export class TodoValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TodoValidationError";
  }
}

export class TodoNotFoundError extends Error {
  constructor(public readonly id: string) {
    super(`Todo #${id} tidak ditemukan.`);
    this.name = "TodoNotFoundError";
  }
}
