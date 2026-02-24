"use server";

import { createSession } from "@/lib/session";

export const startSession = async (): Promise<{
	sessionId: string;
	firstRiddleId: string;
}> => {
	const session = createSession();
	return {
		sessionId: session.id,
		firstRiddleId: session.currentRiddleId!,
	};
};
