import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-24 md:px-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
        <div className="mb-8">
          <h1 className="font-pp-neue-montreal text-6xl text-black md:text-9xl">
            404
          </h1>
        </div>

        <div className="mb-12">
          <h2 className="font-pp-neue-montreal mb-4 text-2xl text-black md:text-4xl">
            Page Not Found
          </h2>
        </div>

        <div className="mb-12 max-w-2xl">
          <p className="font-pp-neue-montreal text-base text-black/70 md:text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>
        </div>

        <Link
          href="/"
          className="font-pp-neue-montreal cursor-pointer group relative inline-flex items-center gap-2 rounded-lg border-2 border-black bg-white px-8 py-4 text-base text-black transition-all duration-300 hover:bg-black hover:text-white md:text-lg"
        >
          <span>Return Home</span>
          <svg
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
