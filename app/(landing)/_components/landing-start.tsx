"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { startSession } from "../_actions/landing-actions";

export const LandingStart = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleStart = async () => {
		setLoading(true);
		const { sessionId, firstRiddleId } = await startSession();
		router.push(`/riddle/${firstRiddleId}?session=${sessionId}`);
	};

	return (
		<button
			type="button"
			onClick={handleStart}
			disabled={loading}
			className="group relative inline-flex items-center gap-3 rounded-sm border border-amber bg-panel px-8 py-4 font-mono text-sm tracking-[0.15em] uppercase text-amber transition-all hover:bg-amber-glow hover:shadow-[0_0_20px_var(--amber-glow)] disabled:opacity-50"
		>
			<span className="h-2 w-2 rounded-full bg-amber transition-shadow group-hover:shadow-[0_0_8px_var(--amber)]" />
			{loading ? "Initializing…" : "Start"}
		</button>
	);
};
