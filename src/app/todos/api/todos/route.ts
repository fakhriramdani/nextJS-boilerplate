import { listTodos } from "@/modules/todos";

// Route handler: GET /api/todos. Hanya routing — logika tetap di use case.
export async function GET(_request: Request) {
  try {
    const todos = listTodos();
    return Response.json({ ok: true, data: todos });
  } catch (error) {
    const message =
      error instanceof Error && "code" in error && typeof error.code === "string"
        ? error.message
        : "Gagal mengambil daftar todo.";
    return Response.json(
      { ok: false, error: { code: "INTERNAL_ERROR", message } },
      { status: 500 },
    );
  }
}
