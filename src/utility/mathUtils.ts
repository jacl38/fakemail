import Rand from "rand-seed";

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

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const shuffleArray = (array: any[], seed: number) => {
	const rand = new Rand(seed.toString());
	for(let i = 0; i < array.length; i++) {
		const j = Math.floor(rand.next() * array.length);
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}