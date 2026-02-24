import { describe, expect, it } from "vitest";
import { getWorkInterval } from "./work-interval";

const dateAtHour = (hour: number): Date => {
	const date = new Date("2026-02-24T00:00:00");
	date.setHours(hour, 0, 0, 0);
	return date;
};

describe("getWorkInterval", () => {
	it('returns "Busy times" for hours 5–10', () => {
		expect(getWorkInterval(dateAtHour(5))).toBe("Busy times");
		expect(getWorkInterval(dateAtHour(7))).toBe("Busy times");
		expect(getWorkInterval(dateAtHour(10))).toBe("Busy times");
	});

	it('returns "Easy jets" for hours 11–16', () => {
		expect(getWorkInterval(dateAtHour(11))).toBe("Easy jets");
		expect(getWorkInterval(dateAtHour(13))).toBe("Easy jets");
		expect(getWorkInterval(dateAtHour(16))).toBe("Easy jets");
	});

	it('returns "Returning pips" for hours 17–22', () => {
		expect(getWorkInterval(dateAtHour(17))).toBe("Returning pips");
		expect(getWorkInterval(dateAtHour(20))).toBe("Returning pips");
		expect(getWorkInterval(dateAtHour(22))).toBe("Returning pips");
	});

	it('returns "Sleepies" for hours 23–4', () => {
		expect(getWorkInterval(dateAtHour(23))).toBe("Sleepies");
		expect(getWorkInterval(dateAtHour(0))).toBe("Sleepies");
		expect(getWorkInterval(dateAtHour(4))).toBe("Sleepies");
	});
});
