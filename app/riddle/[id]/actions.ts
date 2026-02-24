"use server";

import {
	completeRiddle,
	getSession,
	isSessionComplete,
	recordAttempt,
} from "@/lib/session";
import { getAnswerFor } from "@/packages/riddle-exam";

export const checkAnswer = async (
	riddleId: string,
	answerId: string,
	sessionId?: string,
): Promise<{ correct: boolean }> => {
	const correctAnswerId = await getAnswerFor(riddleId);
	const correct = answerId === correctAnswerId;

	if (sessionId) {
		if (correct) {
			completeRiddle(sessionId, riddleId);
		} else {
			recordAttempt(sessionId, riddleId);
		}
	}

	return { correct };
};

export const getNextRiddle = async (
	sessionId: string,
): Promise<{ nextRiddleId: string | null; isComplete: boolean }> => {
	const session = getSession(sessionId);
	if (!session) {
		return { nextRiddleId: null, isComplete: true };
	}
	return {
		nextRiddleId: session.currentRiddleId,
		isComplete: isSessionComplete(sessionId),
	};
};
