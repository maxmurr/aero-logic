"use client";

import type { RiddleResult } from "./actions";
import Link from "next/link";

export const FinishView = ({ results }: { results: RiddleResult[] }) => {
	return (
		<main className="flex flex-1 flex-col items-center justify-center px-4 py-16 aviation-grid">
			<div className="w-full max-w-2xl">
				{/* Header */}
				<div className="flex items-center gap-3 mb-6">
					<span className="font-mono text-xs tracking-[0.2em] uppercase text-amber">
						MISSION COMPLETE
					</span>
					<span className="flex-1 h-px bg-panel-border" />
				</div>

				{/* Summary card */}
				<div className="hud-frame hud-frame-bottom rounded-sm border border-panel-border bg-panel p-8 shadow-sm">
					<p className="text-lg leading-relaxed tracking-wide font-light mb-6">
						You have completed all riddles. Here is your performance summary:
					</p>

					<ul className="space-y-3" data-test="results-list">
						{results.map((result) => (
							<li
								key={result.riddleId}
								data-test={`result-${result.riddleId}`}
								className="flex items-start gap-4 rounded-sm border border-panel-border bg-answer-bg p-4"
							>
								<span className="font-mono text-xs text-amber shrink-0">
									RDL-{result.riddleId.padStart(3, "0")}
								</span>
								<span className="text-sm tracking-wide flex-1">
									{result.contents}
								</span>
								<span
									data-test={`attempts-${result.riddleId}`}
									className="font-mono text-xs text-muted shrink-0"
								>
									{result.attempts} {result.attempts === 1 ? "attempt" : "attempts"}
								</span>
							</li>
						))}
					</ul>
				</div>

				{/* Back to Home */}
				<div className="mt-10 flex justify-center">
					<Link
						href="/"
						data-test="back-to-home"
						className="group relative inline-flex items-center gap-3 rounded-sm border border-amber bg-panel px-8 py-4 font-mono text-sm tracking-[0.15em] uppercase text-amber transition-all hover:bg-amber-glow hover:shadow-[0_0_20px_var(--amber-glow)]"
					>
						Back to Home
					</Link>
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
