
const ArrayUtil = {}

ArrayUtil.findIndex = (array, element) => {
	if (array instanceof Array) {
		const num = array.length
		for (var i = 0; i < num; i++) {
			if (array[i] === element) {
				return i
			}
		}
	}
	return null
}

export default ArrayUtil