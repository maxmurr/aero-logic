export default function FinishLoading() {
	return (
		<main className="flex flex-1 flex-col items-center justify-center px-4 py-16 aviation-grid">
			<div className="w-full max-w-2xl animate-pulse">
				<div className="flex items-center gap-3 mb-6">
					<div className="h-3 w-32 rounded bg-panel-border" />
					<span className="flex-1 h-px bg-panel-border" />
				</div>
				<div className="rounded-sm border border-panel-border bg-panel p-8">
					<div className="h-5 w-2/3 rounded bg-panel-border mb-6" />
					<div className="space-y-3">
						{[1, 2, 3, 4].map((i) => (
							<div key={i} className="h-16 rounded-sm border border-panel-border bg-answer-bg" />
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
