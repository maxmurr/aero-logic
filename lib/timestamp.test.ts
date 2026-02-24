import { describe, expect, it } from "vitest";
import { formatTimestamp } from "./timestamp";

describe("formatTimestamp", () => {
	it("returns ISO 8601 format", () => {
		const date = new Date("2026-02-24T14:30:00.000Z");
		const result = formatTimestamp(date);

		expect(result.iso).toBe("2026-02-24T14:30:00.000Z");
	});

	it("returns HHMM aviation time in UTC", () => {
		const date = new Date("2026-02-24T14:30:00.000Z");
		const result = formatTimestamp(date);

		expect(result.hhmm).toBe("1430");
	});

	it("pads single-digit hours with leading zero", () => {
		const date = new Date("2026-02-24T08:05:00.000Z");
		const result = formatTimestamp(date);

		expect(result.hhmm).toBe("0805");
	});

	it("handles midnight", () => {
		const date = new Date("2026-02-24T00:00:00.000Z");
		const result = formatTimestamp(date);

		expect(result.hhmm).toBe("0000");
	});
});
