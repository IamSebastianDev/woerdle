/** @format */

export const getRandomWord = (pool) =>
	pool[Math.floor(Math.random() * pool.length) * 1];
