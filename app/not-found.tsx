import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex flex-1 flex-col items-center justify-center px-4 py-16 aviation-grid">
			<div className="w-full max-w-2xl text-center">
				<span className="font-mono text-xs tracking-[0.2em] uppercase text-amber">
					404 — NOT FOUND
				</span>
				<p className="mt-4 text-lg tracking-wide font-light">
					This route does not exist in our flight plan.
				</p>
				<div className="mt-8">
					<Link
						href="/"
						className="inline-flex items-center gap-3 rounded-sm border border-amber bg-panel px-8 py-4 font-mono text-sm tracking-[0.15em] uppercase text-amber transition-all hover:bg-amber-glow"
					>
						Back to Home
					</Link>
				</div>
			</div>
		</main>
	);
}
