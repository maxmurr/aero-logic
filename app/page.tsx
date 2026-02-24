import { formatTimestamp } from "@/lib/timestamp";
import { getWorkInterval } from "@/lib/work-interval";
import { LandingStart } from "./landing-start";
import { LandingView } from "./landing-view";

export default function Home() {
	const now = new Date();
	const interval = getWorkInterval(now);
	const { iso, hhmm } = formatTimestamp(now);

	return (
		<LandingView
			interval={interval}
			iso={iso}
			hhmm={hhmm}
			action={<LandingStart />}
		/>
	);
}
