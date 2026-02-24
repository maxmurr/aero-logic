"use client";

import type { Riddle } from "@/lib/riddles";
import { checkAnswer } from "./actions";
import { RiddleView } from "./riddle-view";

export const RiddleController = ({
	riddle,
	sessionId,
}: {
	riddle: Riddle;
	sessionId: string;
}) => {
	const handleCheckAnswer = async (riddleId: string, answerId: string) => {
		return checkAnswer(riddleId, answerId);
	};

	return (
		<RiddleView
			riddle={riddle}
			checkAnswer={handleCheckAnswer}
		/>
	);
};
