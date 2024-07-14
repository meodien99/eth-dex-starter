import Link from "next/link";

export default function P404() {
  return (
    <>
      <main className="grid min-h-full place-items-center sm:py-32 lg:px-8 py-24">
        <div className="text-center mt-24">
          <p className="text-base font-semibold text-green-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-200 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-400">Sorry, we could not find the page you are looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <Link href="/support" className="text-sm font-semibold text-gray-400">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
