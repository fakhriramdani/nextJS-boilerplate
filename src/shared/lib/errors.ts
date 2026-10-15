export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public override cause?: unknown,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

/** Field-level validation errors coming from Zod (no internal detail leaked). */
export interface FieldErrors {
  readonly [field: string]: string[];
}

/** Normalized error shape returned to the client (action / route handler). */
export interface AppErrorShape {
  readonly code: string;
  readonly message: string;
  readonly fieldErrors?: FieldErrors;
}

/** Result of a use-case / action: success or a sanitized error. */
export type Result<T> =
  | { readonly ok: true; readonly data: T }
  | { readonly ok: false; readonly error: AppErrorShape };

export const ok = <T>(data: T): Result<T> => ({ ok: true, data });

export const fail = (error: AppErrorShape): Result<never> => ({ ok: false, error });
