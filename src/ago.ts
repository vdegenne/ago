interface AgoOptions {
	/**
	 * If true will print "Today" and "Yesterday" for respective interval.
	 *
	 * @default false
	 */
	todayAndYesterday: boolean;
}

export function ago(
	dateInput: string | number,
	options?: Partial<AgoOptions>,
): string {
	const _options: AgoOptions = {
		todayAndYesterday: false,
		...options,
	};

	const now = new Date();
	let pastDate: Date;

	if (typeof dateInput === 'number') {
		pastDate = new Date(dateInput < 1e11 ? dateInput * 1000 : dateInput);
		console.log(pastDate);
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
			if (_options.todayAndYesterday) {
				if (unit === 'hour' || unit === 'min' || unit === 'sec') {
					return 'Today';
				} else if (unit === 'day' && interval === 1) {
					return 'Yesterday';
				}
			}
			return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
		}
	}

	return 'just now';
}
