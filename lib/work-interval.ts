export const getWorkInterval = (date: Date): string => {
	const hour = date.getHours();

	if (hour >= 5 && hour <= 10) return "Busy times";
	if (hour >= 11 && hour <= 16) return "Easy jets";
	if (hour >= 17 && hour <= 22) return "Returning pips";
	return "Sleepies";
};
