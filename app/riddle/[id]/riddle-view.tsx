import type { Riddle } from "@/lib/riddles";

export const RiddleView = ({ riddle }: { riddle: Riddle }) => {
	const designator = `RDL-${riddle.id.padStart(3, "0")}`;

	return (
		<main className="flex flex-1 flex-col items-center justify-center px-4 py-16 aviation-grid">
			<div className="w-full max-w-2xl">
				{/* Flight designator header */}
				<div className="flex items-center gap-3 mb-6">
					<span className="font-mono text-xs tracking-[0.2em] uppercase text-amber">
						{designator}
					</span>
					<span className="flex-1 h-px bg-panel-border" />
					<span className="font-mono text-xs tracking-wider text-muted">
						RIDDLE
					</span>
				</div>

				{/* Riddle card — instrument panel style */}
				<div className="hud-frame hud-frame-bottom rounded-sm border border-panel-border bg-panel p-8 shadow-sm">
					<p className="text-lg leading-relaxed tracking-wide font-light">
						{riddle.contents}
					</p>
				</div>

				{/* Answer options */}
				<div className="mt-10">
					<div className="flex items-center gap-3 mb-4">
						<span className="font-mono text-xs tracking-[0.2em] uppercase text-muted">
							OPTIONS
						</span>
						<span className="flex-1 h-px bg-panel-border" />
					</div>

					<ul className="space-y-2">
						{riddle.answers.map((answer, index) => (
							<li
								key={answer.id}
								className="group flex items-center gap-4 rounded-sm border border-answer-border bg-answer-bg px-5 py-4 transition-colors hover:bg-answer-hover hover:border-amber-dim"
							>
								<span className="font-mono text-xs text-amber tabular-nums w-5 shrink-0">
									{String.fromCharCode(65 + index)}
								</span>
								<span className="text-sm tracking-wide">
									{answer.text}
								</span>
							</li>
						))}
					</ul>
				</div>

				{/* Bottom rule */}
				<div className="mt-10 flex items-center gap-3">
					<span className="flex-1 h-px bg-panel-border" />
					<span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
						AERO LOGIC
					</span>
					<span className="flex-1 h-px bg-panel-border" />
				</div>
			</div>
		</main>
	);
};
