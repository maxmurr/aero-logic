import { LandingClock } from "./_components/landing-clock";
import { LandingStart } from "./_components/landing-start";
import { LandingView } from "./_components/landing-view";

export default function Home() {
	return (
		<LandingView action={<LandingStart />}>
			<LandingClock />
		</LandingView>
	);
}
