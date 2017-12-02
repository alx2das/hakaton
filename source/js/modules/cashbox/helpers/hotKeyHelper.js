import {uuid} from 'infrastructure/utils/uuidGenerator'
export const generateMatrix = ({width, height}) => {
	let matrix = [];
	for (let i = 0; i <= height - 1; i++) {
		matrix[i] = [];
		for (let j = 0; j <= width - 1; j++) {
			matrix[i][j] = {row: i, col: j, tempId: uuid()};
		}
	}
	return matrix;
};

const notNull = item => item != null && item != undefined;

export const generateWrapperClass = (row, col, width = null, height = null) => {
	let className = '';

	className += notNull(row) ? ` row${row + 1}` : '';
	className += notNull(col) ? ` col${col + 1}` : '';
	className += notNull(width) ? ` cell_w${width}` : '';
	className += notNull(height) ? ` cell_h${height}` : '';
	return className;
};

/**
 * Возвращает маску из 1 и 0, для заполненных ячеек (1)
 */
export const getCordsMask = (width, height, cords) => {
	let matrix = generateMatrix({width, height});
	cords.forEach((item) => {
		const {row, col, width, height}=item;
		for (let i = row; i < row + height; i++) {
			for (let j = col; j < col + width; j++) {
				matrix[i][j].value = 1;
			}
		}
	});

	let mask = [];

	matrix.forEach(row => {
		row.forEach(col => {
			mask.push(col.value == 1 ? 1 : 0);
		});
	});
	return mask;
};

export const isValidCord = ({width, height}, cord) => {
	if (cord.row + cord.height > height)
		return false;
	if (cord.col + cord.width > width)
		return false;
	return true;
};