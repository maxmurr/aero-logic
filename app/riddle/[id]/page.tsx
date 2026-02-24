import { getRiddleById } from "@/lib/riddles";
import { notFound } from "next/navigation";
import { checkAnswer } from "./actions";
import { RiddleController } from "./riddle-controller";
import { RiddleView } from "./riddle-view";

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
		return <RiddleController riddle={riddle} sessionId={sessionId} />;
	}

	return <RiddleView riddle={riddle} checkAnswer={checkAnswer} />;
};

export default RiddlePage;
