import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <h1 className="text-3xl font-bold">Nextjs Boilerplate</h1>
      <p className="text-sm text-muted-foreground">
        Clean architecture boilerplate untuk Next.js App Router.
      </p>
      <p className="text-xs text-muted-foreground">
        Composable dependency via `index.ts`; validasi Zod di boundary;
        error domain dipetakan di boundary.
      </p>
      <ul className="mt-6 text-left text-sm text-muted-foreground max-w-md">
        <li>• Domain: entitas &amp; aturan bisnis (strict ts + noUncheckedIndexedAccess)</li>
        <li>• Application: use case (1 file = 1 use case, DI via params)</li>
        <li>• Infrastructure: implementasi port (in-memory untuk demo)</li>
        <li>• Presentation: UI + server action + client component</li>
        <li>• Kategori ESLint: `no-restricted-imports` memisahkan layer</li>
      </ul>
      <Link
        href="/todos"
        className="mt-6 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
      >
        Buka /todos
      </Link>
    </div>
  );
}
