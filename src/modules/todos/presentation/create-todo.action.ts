import { z } from "zod";
import { fail, ok, type Result } from "@/shared/lib/errors";
import { createTodo as createTodoUseCase } from "@/modules/todos";

export interface CreateTodoPayload {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
}

const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, "Title minimal 1 karakter.")
    .max(100, "Title maksimal 100 karakter."),
});

/** State shape for `useActionState` (mirrors the shared `Result`). */
export type FormState = Result<CreateTodoPayload>;

/**
 * Server action: boundary parse (Zod) → use case → sanitized result.
 * Domain errors are mapped; internal details never leak to the client.
 */
export const createTodoServerAction = async (
  _prevState: unknown,
  formData: FormData,
): Promise<FormState> => {
  const title = formData.get("title");
  if (typeof title !== "string") {
    return fail({ code: "VALIDATION_ERROR", message: "Title wajib diisi." });
  }

  const parsed = createTodoSchema.safeParse({ title });
  if (!parsed.success) {
    return fail({
      code: "VALIDATION_ERROR",
      message: "Validasi gagal.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    });
  }

  try {
    const todo = createTodoUseCase(parsed.data.title);
    return ok({ id: todo.id, title: todo.title, completed: todo.completed });
  } catch (error) {
    if (error instanceof Error) {
      const code = (error as { code?: unknown }).code;
      if (typeof code === "string") {
        return fail({ code, message: error.message });
      }
    }
    throw error;
  }
};

