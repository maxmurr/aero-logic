"use client";

export default function GlobalError({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html lang="en">
			<body className="min-h-full flex flex-col items-center justify-center bg-[#0b0b11] text-[#d4d2cc] font-mono">
				<h2 className="text-lg tracking-wide mb-4">Something went wrong</h2>
				<button
					type="button"
					onClick={reset}
					className="rounded-sm border border-[#e8a027] px-6 py-3 text-sm tracking-[0.15em] uppercase text-[#e8a027] hover:bg-[#e8a02722]"
				>
					Try Again
				</button>
			</body>
		</html>
	);
}
