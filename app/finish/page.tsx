import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionResults } from "./actions";
import { FinishView } from "./finish-view";

export const metadata: Metadata = {
	title: "Results — Aero Logic",
};

const FinishPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ session?: string }>;
}) => {
	const { session: sessionId } = await searchParams;

	if (!sessionId) {
		redirect("/");
	}

	const results = await getSessionResults(sessionId);

	if (!results) {
		redirect("/");
	}

	return <FinishView results={results} />;
};

export default FinishPage;
