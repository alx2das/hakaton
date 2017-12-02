/**
 * Created by RobertSabiryanov on 13.06.17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';

class InfinateScroll extends React.Component {
    render() {
        const {loading, loadNext, totalCount} = this.props;
        const listLength = this.props.listLength || 50;
        const className = ['table_row'];
        const showWaypoint = totalCount > listLength;

        if (loading) {
            className.push('loading_block  loading_block__h40');
        }
        return (<div class={className.join(' ')}>
            {showWaypoint && <Waypoint onEnter={loadNext}/>}
        </div>)
    }
}

InfinateScroll.propTypes = {
    loadNext: PropTypes.func.isRequired, //функция которая будет вызвана для подгрузки последующих элементов
    totalCount: PropTypes.number, //общее максимально количество элементов в списке
    loading: PropTypes.bool, //флаг, который говорит о том, что идет подгрузка
    listLength: PropTypes.number //количество элементов на 1 экране списка, по умолчанию 50
};

export default InfinateScroll;