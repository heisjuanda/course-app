function isEmpty(arr) {
	let r = true;
	for (let el of arr) {
		if (el) {
			r = false;
		}
	}
	return r;
}
export default isEmpty;
