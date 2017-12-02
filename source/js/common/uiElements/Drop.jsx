import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TetherDrop from 'tether-drop';
import enhanceWithClickOutside from 'react-click-outside';


const defaultOptions = {
    position: 'bottom left',
    openOn: 'click',
    constrainToWindow: true,
    constrainToScrollParent: true,
    classes: 'drop-theme-basic',
    hoverOpenDelay: 0,
    hoverCloseDelay: 50,
    focusDelay: 0,
    blurDelay: 50,
    tetherOptions: {},
};

// attachment="top center"
// constraints={[{
//     to: 'scrollParent',
//     attachment: 'together'
// }]}

class Drop extends React.Component {

    constructor() {
        super();
        this.container = document.createElement('div');
        this.state = {
            isOpened: false
        }
    }

    static defaultProps = {
        drop: {
            position: 'bottom left',
            openOn: 'click',
            constrainToWindow: true,
            constrainToScrollParent: true,
            classes: 'drop-theme-basic',
            hoverOpenDelay: 0,
            hoverCloseDelay: 50,
            focusDelay: 0,
            blurDelay: 50,
            tetherOptions: {},
        }
    };

    reposition() {
        if (this.drop) {
            this.drop.position();
        }
    }

    componentDidMount() {
        this.initDrop();
        this.props.setInstance && this.props.setInstance(this);
    }

    isOpen() {
        return this.drop && this.drop.isOpened();
    }

    close() {
        return this.drop && this.drop.close();
    }

    componentWillUnmount() {
        this.destroyDrop();
        this.props.setInstance && this.props.setInstance(null);
    }

    getDropContent() {
        const {children} = this.props;
        const dropContent = React.Children.map(children, (child) => {
            if (child.props.className.indexOf('drop-content') > -1) {
                return child;
            }
        })[0];
        if (!dropContent) {
            throw new Error('Child element with class drop-content must be specified');
        }
        return dropContent;
    }

    initDrop() {

        const outOptions = this.props.drop;
        const opts = Object.assign({
            target: this.refs.drop,
        }, outOptions);

        opts.content = () => {
            const content = this.getDropContent();
            const component = React.cloneElement(content, content.props, this.bindCloseEvent(content));
            return ReactDOM.render(component, this.container);
        };
        this.drop = new TetherDrop(opts);
    }

    bindCloseEvent(content) {
        const self = this;
        return React.Children.map(content, c => {
            if (c && c.props) {
                let props = null;
                let children = c.props.children ? this.bindCloseEvent(c.props.children) : null;
                if (c.props["data-close"]) {
                    props = {
                        onClick: () => {
                            self.close();
                            c.props.onClick && c.props.onClick();
                        }
                    };
                }
                if (children || props)
                    return React.cloneElement(c, props, children);
            }
            return c
        });
    }

    destroyDrop() {
        if (this.drop) {
            ReactDOM.unmountComponentAtNode(this.container);
            this.drop.close();
            this.drop.destroy()
        }
    }


    render() {
        let targetLink = null;
        React.Children.forEach(this.props.children, child => {
            if (child.props.className.indexOf('drop-target') > -1) {
                targetLink = child;
            }
        });

        return React.cloneElement(targetLink, {
            ref: 'drop'
        });
    }
}

Drop.propTypes = {
    drop: PropTypes.object,
    onClose: PropTypes.func
};

export default Drop