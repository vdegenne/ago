export function ago(dateInput: string | number): string {
	const now = new Date();
	let pastDate: Date;

	if (typeof dateInput === 'number') {
		pastDate = new Date(dateInput < 1e11 ? dateInput * 1000 : dateInput);
	} else {
		pastDate = new Date(dateInput);
	}

	const seconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

	const intervals: {[key: string]: number} = {
		year: 31536000,
		month: 2592000,
		day: 86400,
		hour: 3600,
		min: 60,
		sec: 1,
	};

	for (const [unit, value] of Object.entries(intervals)) {
		const interval = Math.floor(seconds / value);
		if (interval >= 1) {
			return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
		}
	}

	return 'just now';
}
