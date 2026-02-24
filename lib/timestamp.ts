export const formatTimestamp = (date: Date): { iso: string; hhmm: string } => {
	const iso = date.toISOString();
	const hours = String(date.getUTCHours()).padStart(2, "0");
	const minutes = String(date.getUTCMinutes()).padStart(2, "0");

	return { iso, hhmm: `${hours}${minutes}` };
};
