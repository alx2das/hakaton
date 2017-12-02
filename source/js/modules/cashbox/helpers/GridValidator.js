import {getCordsMask} from '../helpers/hotKeyHelper'

class GridValidator {
	width = 0;
	height = 0;

	constructor(width, height) {
		this.width = width;
		this.height = height;
	}


	maxHeight({row}) {
		return this.height - row;
	}

	maxWidth({col}) {
		return this.width - col;
	}

	maxRow({height}) {
		return this.height - height;
	}

	maxCol({width}) {
		return this.width - width;
	}

	validHeight({row, height}) {
		return height <= this.maxHeight({row});
	}

	validWidth({col, width}) {
		return width <= this.maxWidth({col});
	}

	validRow({row, height}) {
		return row <= this.maxRow({height});
	}

	validCol({col, width}) {
		return col <= this.maxCol({width});
	}

	isValidCord({row, col, width, height}) {
		return this.validHeight({row, height}) && this.validWidth({col, width})
			&& this.validRow({row, height}) && this.validCol({col, width});
	}

	intersect(key, keys) {
		const maskOther = getCordsMask(this.width, this.height, keys);
		const maskCurrent = getCordsMask(this.width, this.height, [key]);

		let valid = true;
		let i = 0;
		while (valid && i <= maskOther.length - 1) {
			valid = (maskOther[i] & maskCurrent[i]) === 0;
			i++;
		}

		return !valid;
	}
}

export default GridValidator;