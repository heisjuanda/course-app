function isEmpty(arr) {
	let result = true;
	for (let el of arr) {
		if (el) {
			result = false;
		}
	}
	return result;
}
export default isEmpty;
