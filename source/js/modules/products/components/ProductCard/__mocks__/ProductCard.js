import React from 'react';

const mockModule = jest.genMockFromModule('modules/products/components/ProductCard/ProductCard');

class ProductCardMock extends React.Component {
	render() {
		return <span>ProductCardMock</span>;
	}
}

mockModule.default = function () {
	return ProductCardMock;
}
module.exports = mockModule;