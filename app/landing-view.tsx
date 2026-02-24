import type { ReactNode } from "react";

type LandingViewProps = {
	interval: string;
	iso: string;
	hhmm: string;
	action: ReactNode;
};

export const LandingView = ({ interval, iso, hhmm, action }: LandingViewProps) => {
	return (
		<main className="flex flex-1 flex-col items-center justify-center px-4 py-16 aviation-grid">
			<div className="w-full max-w-2xl">
				{/* Flight ops header */}
				<div className="flex items-center gap-3 mb-6">
					<span className="font-mono text-xs tracking-[0.2em] uppercase text-amber">
						OPS STATUS
					</span>
					<span className="flex-1 h-px bg-panel-border" />
					<span className="font-mono text-xs tracking-wider text-muted">
						{hhmm}Z
					</span>
				</div>

				{/* Main card */}
				<div className="hud-frame hud-frame-bottom rounded-sm border border-panel-border bg-panel p-8 shadow-sm">
					{/* Work interval */}
					<div className="mb-6">
						<span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
							Current Interval
						</span>
						<p className="mt-1 text-2xl font-light tracking-wide text-amber">
							{interval}
						</p>
					</div>

					{/* Timestamp */}
					<div className="mb-8">
						<span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
							Timestamp
						</span>
						<p className="mt-1 font-mono text-sm tracking-wider text-foreground/70">
							{iso}
						</p>
					</div>

					{/* Welcome */}
					<p className="text-lg leading-relaxed tracking-wide font-light">
						Welcome to Aero Logic. Test your aviation knowledge with a series
						of riddles drawn from the world of flight.
					</p>
				</div>

				{/* Start entry point */}
				<div className="mt-10 flex justify-center">
					{action}
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
