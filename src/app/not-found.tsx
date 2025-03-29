import Link from "next/link";

export default function CustomNotFoundPage() {
  return (
    <section className="flex items-center h-full p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-slate-400">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl dark:text-slate-400">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 dark:text-slate-400">
            But dont worry, you can find plenty of other things here.
          </p>
          <Link
            rel="noopener noreferrer"
            href="/"
            className="px-8 py-3 font-semibold rounded bg-blue-600 text-slate-50"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
