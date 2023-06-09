function getHours(course) {
	if (course) {
		let [hour, minutes] = (course.duration / 60 + '').split('.');
		let minu = Math.round(parseFloat('0.' + minutes) * 60) / 10;
		let [mins, sec] = (minu + '').split('.');
		if (sec) {
			return `${hour}:${mins}${sec}`;
		} else {
			return `${hour}:${mins}0`;
		}
	}
}

export default getHours;
