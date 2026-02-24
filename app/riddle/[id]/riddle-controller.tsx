"use client";

import { useRouter } from "next/navigation";
import type { Riddle } from "@/lib/riddles";
import { checkAnswer, getNextRiddle } from "./actions";
import { RiddleView } from "./riddle-view";

export const RiddleController = ({
	riddle,
	sessionId,
}: {
	riddle: Riddle;
	sessionId: string;
}) => {
	const router = useRouter();

	const handleCheckAnswer = async (riddleId: string, answerId: string) => {
		return checkAnswer(riddleId, answerId, sessionId);
	};

	const handleNextQuestion = async () => {
		const { nextRiddleId, isComplete } = await getNextRiddle(sessionId);

		if (isComplete) {
			router.push(`/finish?session=${sessionId}`);
		} else if (nextRiddleId) {
			router.push(`/riddle/${nextRiddleId}?session=${sessionId}`);
		}
	};

	return (
		<RiddleView
			riddle={riddle}
			checkAnswer={handleCheckAnswer}
			onRetry={() => {}}
			onNextQuestion={handleNextQuestion}
		/>
	);
};
