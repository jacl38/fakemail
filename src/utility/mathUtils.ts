

export const timeSpanToMilliseconds = (timeSpan: {
	weeks?: number,
	days?: number,
	hours?: number,
	minutes?: number,
	seconds?: number,
	milliseconds?: number
}) => {
	let ms = timeSpan.milliseconds ?? 0;

	ms += (timeSpan.seconds ?? 0) * 1000;
	ms += (timeSpan.minutes ?? 0) * 1000 * 60;
	ms += (timeSpan.hours   ?? 0) * 1000 * 60 * 60;
	ms += (timeSpan.days    ?? 0) * 1000 * 60 * 60 * 24;
	ms += (timeSpan.weeks   ?? 0) * 1000 * 60 * 60 * 24 * 7;
	
	return ms;
}