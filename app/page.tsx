import { LandingClock } from "./landing-clock";
import { LandingStart } from "./landing-start";
import { LandingView } from "./landing-view";

export default function Home() {
	return (
		<LandingView action={<LandingStart />}>
			<LandingClock />
		</LandingView>
	);
}
