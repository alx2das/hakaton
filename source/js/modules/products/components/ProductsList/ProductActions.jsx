import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip'

class ProductActions extends React.Component {
    static propTypes = {
        onCreateProduct: PropTypes.func.isRequired,
        onExportProduct: PropTypes.func.isRequired
    };

    render() {
        return ( <div class="title_actions">
            <button data-tip="Скачать справочник в формате XLS"
                    class="button light small"
                    onClick={this.props.onExportProduct}>Экспорт
            </button>
            <Link class="button light small" to="/products/import">Импорт</Link>
            <button class="button small icon-plus" onClick={this.props.onCreateProduct}>Добавить товар</button>
            <ReactTooltip place="bottom" effect="solid" />
        </div>)
    }
}

export default ProductActions