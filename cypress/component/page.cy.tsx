import { LandingView } from "../../app/(landing)/_components/landing-view";
import { LandingClock } from "../../app/(landing)/_components/landing-clock";

const startButton = <button type="button">Start</button>;

describe("Landing Page", () => {
	it("renders the LandingClock and welcome message", () => {
		cy.mount(
			<LandingView action={startButton}>
				<LandingClock />
			</LandingView>,
		);

		cy.contains("Welcome to Aero Logic").should("be.visible");
		cy.contains("OPS STATUS").should("be.visible");
	});

	it("renders the Start entry point", () => {
		cy.mount(
			<LandingView action={startButton}>
				<LandingClock />
			</LandingView>,
		);

		cy.contains("Start").should("be.visible");
	});

	it("renders AERO LOGIC footer", () => {
		cy.mount(
			<LandingView action={startButton}>
				<LandingClock />
			</LandingView>,
		);

		cy.contains("AERO LOGIC").should("be.visible");
	});
});
