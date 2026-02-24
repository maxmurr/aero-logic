import { getRiddleById } from "@/lib/riddles";
import { notFound } from "next/navigation";
import { RiddleView } from "./riddle-view";

const RiddlePage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;
	const riddle = getRiddleById(id);

	if (!riddle) {
		notFound();
	}

	return <RiddleView riddle={riddle} />;
};

export default RiddlePage;
