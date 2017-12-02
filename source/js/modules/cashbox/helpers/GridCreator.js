class GridCreator {
	row = 0;
	col = 0;
	width = 0;
	height = 0;
	grid = [];

	constructor(width, height) {
		this.grid = [];
		this.width = width;
		this.height = height;
	}

	getLimit() {
		return this.width * this.height;
	}

	add(props) {
		if (this.grid.length === this.width * this.height)
			return;
		const item = {
			col: this.col,
			row: this.row,
			width: 1,
			height: 1,
			...props
		};
		this.grid.push(item);
		this.col += 1;
		if (this.col >= this.width) {
			this.col = 0;
			this.row += 1;
			if (this.row >= this.height) {
				this.row = 0;
				return;
			}
		}
		return item;
	}

	getResult() {
		return this.grid;
	}
}

export default GridCreator;