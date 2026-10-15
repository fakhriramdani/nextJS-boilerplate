import { Suspense } from "react";
import { listTodos } from "@/modules/todos";
import type { Todo } from "@/modules/todos";
import TodosFormClient from "@/modules/todos/presentation";

export default function TodosPage() {
  const todos = listTodos();

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold">Todo</h1>
      <p className="text-sm text-muted-foreground">
        Daftar tugas (implementasi in-memory). Data tetap ada selama proses berjalan.
      </p>

      <Suspense fallback={<p className="text-sm text-muted-foreground">Memuat...</p>}>
        <TodosFormClient />
      </Suspense>

      {todos.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Tidak ada todo. Tambah di atas.
        </p>
      ) : (
        <ul className="mt-4 max-w-xl space-y-2">
          {todos.map((todo: Todo) => (
            <li
              key={todo.id}
              className="rounded-md border border-input px-3 py-2 text-sm"
            >
              <span className="font-medium">{todo.title}</span>
              <span className="ml-2 text-muted-foreground">
                {todo.completed ? "(sudah selesai)" : "(belum selesai)"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
