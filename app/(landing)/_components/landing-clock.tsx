"use client";

import { useMemo } from "react";
import { formatTimestamp } from "@/lib/timestamp";
import { getWorkInterval } from "@/lib/work-interval";

export const LandingClock = () => {
	const clock = useMemo(() => {
		const now = new Date();
		return {
			interval: getWorkInterval(now),
			...formatTimestamp(now),
		};
	}, []);

	return (
		<>
			{/* Flight ops header */}
			<div className="flex items-center gap-3 mb-6">
				<span className="font-mono text-xs tracking-[0.2em] uppercase text-amber">
					OPS STATUS
				</span>
				<span className="flex-1 h-px bg-panel-border" />
				<span className="font-mono text-xs tracking-wider text-muted">
					{clock.hhmm}Z
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
						{clock.interval}
					</p>
				</div>

				{/* Timestamp */}
				<div className="mb-8">
					<span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
						Timestamp
					</span>
					<p className="mt-1 font-mono text-sm tracking-wider text-foreground/70">
						{clock.iso}
					</p>
				</div>

				{/* Welcome */}
				<p className="text-lg leading-relaxed tracking-wide font-light">
					Welcome to Aero Logic. Test your aviation knowledge with a series
					of riddles drawn from the world of flight.
				</p>
			</div>
		</>
	);
};
