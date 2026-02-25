import type { Metadata } from "next";
import { getRiddleById } from "@/lib/riddles";
import { notFound } from "next/navigation";
import { checkAnswer, getSessionProgress } from "./actions";
import { RiddleController } from "./riddle-controller";
import { RiddleView } from "./riddle-view";

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> => {
	const { id } = await params;
	const riddle = getRiddleById(id);
	return {
		title: riddle
			? `Riddle ${id} — Aero Logic`
			: "Riddle Not Found — Aero Logic",
	};
};

const RiddlePage = async ({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ session?: string }>;
}) => {
	const { id } = await params;
	const { session: sessionId } = await searchParams;
	const riddle = getRiddleById(id);

	if (!riddle) {
		notFound();
	}

	if (sessionId) {
		const progress = await getSessionProgress(sessionId);
		return (
			<RiddleController
				riddle={riddle}
				sessionId={sessionId}
				initialProgress={progress}
			/>
		);
	}

	return <RiddleView riddle={riddle} checkAnswer={checkAnswer} />;
};

export default RiddlePage;
