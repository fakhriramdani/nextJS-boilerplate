"use client";

export default function ErrorError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="max-w-xl mx-auto py-10 px-4 text-center">
      <h1 className="text-2xl font-bold text-destructive">Terjadi kesalahan</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
      >
        Coba lagi
      </button>
    </main>
  );
}
