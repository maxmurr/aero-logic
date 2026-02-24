import { getRiddleById } from "@/lib/riddles";
import { NextResponse } from "next/server";

export const GET = async (
	_request: Request,
	{ params }: { params: Promise<{ id: string }> },
) => {
	const { id } = await params;
	const riddle = getRiddleById(id);

	if (!riddle) {
		return NextResponse.json({ error: "Riddle not found" }, { status: 404 });
	}

	return NextResponse.json(riddle);
};
