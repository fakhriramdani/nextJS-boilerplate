import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-xl mx-auto py-10 px-4 text-center">
      <h1 className="text-2xl font-bold">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Halaman yang Anda cari tidak ada.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
      >
        Kembali ke beranda
      </Link>
    </main>
  );
}
