export const HOT_KEY_TYPE = {
	PRODUCT: 'PRODUCT',
	CATEGORY: 'CATEGORY',
	BACK: 'BACK',
	EMPTY: 'EMPTY',
	DRAG: 'DRAG'
};

export const COLORS = {
	"green_light": "#78B432",
	//"green_dark": {", css: ,
	"blue_light": "#03A9F4",
	"blue": "#1565C0",
	"yellow": "#EAAD42",
	"orange": "#D4553D",
	"red": "#BA2E45",
	"purple": "#72324E",
	"gray_light": "#959596",
	"gray_dark": "#4B5154"
};

export const COLORS_INVERTED = Object.keys(COLORS).reduce((colorsObj, colorKey) => {
	colorsObj[COLORS[colorKey].replace('#')] = colorKey;
	return colorsObj;
}, {});

export const DEFAULT_COLOR = COLORS['green_light'];