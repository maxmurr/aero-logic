import { getAllRiddles } from "@/lib/riddles";
import { NextResponse } from "next/server";

export const GET = async () => {
	const riddles = getAllRiddles();
	return NextResponse.json({ riddles });
};
