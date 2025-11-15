import ThemeButton from "@/components/ui/theme/ThemeButton";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center  font-sans ">
      <div className="absolute top-6 right-6">
        <ThemeButton />
      </div>

      <main className="flex w-full max-w-4xl flex-col items-center gap-8 py-24 px-6 bg-white dark:bg-black">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          style={{ width: "auto", height: "auto" }}
          width={120}
          height={30}
          priority
        />

        <h1 className="text-center text-4xl font-bold text-black dark:text-zinc-50">
          Welcome — Next.js Starter
        </h1>

        <p className="max-w-2xl text-center text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          A minimal starter with Tailwind and a theme toggle. This is your new
          home page — keep the Theme button and explore the demo to see example
          pages and components.
        </p>

        <div className="flex gap-4">
          <Link
            href="/demo"
            className="rounded-full bg-black transition dark:bg-white dark:text-black px-6 py-3 text-white font-medium hover:opacity-95"
          >
            View Demo
          </Link>

          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 text-black dark:text-white hover:bg-black/10 transition dark:hover:bg-white/10 border-black px-6 py-3 text-sm dark:border-white/80"
          >
            Docs
          </a>
        </div>

        <section className="mt-8 w-full grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border p-6 bg-zinc-50 dark:bg-zinc-900">
            <h3 className="mb-2 text-lg font-semibold text-black dark:text-zinc-50">
              Quick Start
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Edit files under <code>src/app</code> to begin building your site.
            </p>
          </div>

          <div className="rounded-lg border p-6 bg-zinc-50 dark:bg-zinc-900">
            <h3 className="mb-2 text-lg font-semibold text-black dark:text-zinc-50">
              Theming
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Use the theme toggle (top-right) to switch light/dark modes.
            </p>
          </div>

          <div className="rounded-lg border p-6 bg-zinc-50 dark:bg-zinc-900">
            <h3 className="mb-2 text-lg font-semibold text-black dark:text-zinc-50">
              Components
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Find reusable UI in <code>src/components</code> and demo pages
              under <code>/demo</code>.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
