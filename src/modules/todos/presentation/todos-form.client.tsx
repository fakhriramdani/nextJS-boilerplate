"use client";

import { useActionState } from "react";
import type { FormState } from "./create-todo.action";
import { createTodoServerAction } from "./create-todo.action";

/** Initial (unsuccessful) state. */
const initialState: FormState = {
  ok: false,
  error: { code: "FORM_ERROR", message: "Formulir gagal dikirim. Silakan coba lagi." },
};

export default function TodosFormClient() {
  const [state, formAction] = useActionState(createTodoServerAction, initialState);

  return (
    <div className="flex flex-col gap-3">
      <form action={formAction} className="flex flex-col gap-3">
        <input
          name="title"
          placeholder="Tambah todo (1–100 karakter)"
          className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
          autoComplete="off"
        />
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Tambah
        </button>
      </form>

      {state.ok ? (
        <p className="text-sm text-green-700">
          Todo &quot;{state.data.title}&quot; berhasil ditambahkan.
        </p>
      ) : state.error ? (
        <>
          {state.error.fieldErrors && Object.keys(state.error.fieldErrors).length > 0 ? (
            <ul className="text-sm text-destructive">
              {Object.entries(state.error.fieldErrors).map(([field, messages]) => (
                <li key={field}>
                  {field}: {messages.join(", ")}
                </li>
              ))}
            </ul>
          ) : (
            <p role="alert" className="text-sm text-destructive">
              {state.error.message}
            </p>
          )}
        </>
      ) : null}
    </div>
  );
}
