function getDate() {
	const now = Date.now();
	const date = new Date(now);
	const [formattedDate] = date.toLocaleString().split(',');
	return formattedDate;
}

export default getDate;
