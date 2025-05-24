import {ago} from './ago.js';

const oneYear = 1000 * 60 * 60 * 24 * 365;

function test() {
	const now = Date.now();
	console.assert(ago(now) === 'just now');

	const old = Date.now() - oneYear;
	console.assert(ago(old) === '1 year ago');

	const older = 569203200000;
	console.assert(ago(older) === '37 years ago');
}

test();
