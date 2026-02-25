import type { ReactNode } from "react";

type LandingViewProps = {
	children: ReactNode;
	action: ReactNode;
};

export const LandingView = ({ children, action }: LandingViewProps) => {
	return (
		<main className="flex flex-1 flex-col items-center justify-center px-4 py-16 aviation-grid">
			<div className="w-full max-w-2xl">
				{children}

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
