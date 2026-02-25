import { describe, expect, it } from "vitest";
import { getWorkInterval } from "./work-interval";

const dateAtUTCHour = (hour: number): Date => {
	const date = new Date("2026-02-24T00:00:00Z");
	date.setUTCHours(hour, 0, 0, 0);
	return date;
};

describe("getWorkInterval", () => {
	it('returns "Busy times" for hours 5–10', () => {
		expect(getWorkInterval(dateAtUTCHour(5))).toBe("Busy times");
		expect(getWorkInterval(dateAtUTCHour(7))).toBe("Busy times");
		expect(getWorkInterval(dateAtUTCHour(10))).toBe("Busy times");
	});

	it('returns "Easy jets" for hours 11–16', () => {
		expect(getWorkInterval(dateAtUTCHour(11))).toBe("Easy jets");
		expect(getWorkInterval(dateAtUTCHour(13))).toBe("Easy jets");
		expect(getWorkInterval(dateAtUTCHour(16))).toBe("Easy jets");
	});

	it('returns "Returning pips" for hours 17–22', () => {
		expect(getWorkInterval(dateAtUTCHour(17))).toBe("Returning pips");
		expect(getWorkInterval(dateAtUTCHour(20))).toBe("Returning pips");
		expect(getWorkInterval(dateAtUTCHour(22))).toBe("Returning pips");
	});

	it('returns "Sleepies" for hours 23–4', () => {
		expect(getWorkInterval(dateAtUTCHour(23))).toBe("Sleepies");
		expect(getWorkInterval(dateAtUTCHour(0))).toBe("Sleepies");
		expect(getWorkInterval(dateAtUTCHour(4))).toBe("Sleepies");
	});
});
