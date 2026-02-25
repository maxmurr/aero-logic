export default function RiddleLoading() {
	return (
		<main className="flex flex-1 flex-col items-center justify-center px-4 py-16 aviation-grid">
			<div className="w-full max-w-2xl animate-pulse">
				<div className="flex items-center gap-3 mb-6">
					<div className="h-3 w-20 rounded bg-panel-border" />
					<span className="flex-1 h-px bg-panel-border" />
					<div className="h-3 w-16 rounded bg-panel-border" />
				</div>
				<div className="rounded-sm border border-panel-border bg-panel p-8">
					<div className="h-5 w-3/4 rounded bg-panel-border mb-3" />
					<div className="h-5 w-1/2 rounded bg-panel-border" />
				</div>
				<div className="mt-10 space-y-2">
					{[1, 2, 3, 4].map((i) => (
						<div key={i} className="h-14 rounded-sm border border-panel-border bg-panel" />
					))}
				</div>
			</div>
		</main>
	);
}
