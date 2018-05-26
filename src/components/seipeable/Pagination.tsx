import React, {Component, CSSProperties} from 'react';
import PropTypes from 'prop-types';
import PaginationDot, {PaginationDotProps} from './PaginationDot';

const styles = {
    root: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        display: 'flex',
        flexDirection: 'row',
    },
};

export interface PaginationProps {

    /**
     * 总数
     */
    dots: number;

    onChangeIndex: (index: number) => void;

    /**
     * 当前选中
     */
    index: number;

    style?: React.CSSProperties

    /**
     * dot默认样式
     */
    dotStyle?: CSSProperties;

    /**
     * 激活样式
     */
    activeStyle?: CSSProperties
}

class Pagination extends Component<PaginationProps, any> {

    static propTypes = {
        dots: PropTypes.number.isRequired,
        index: PropTypes.number.isRequired,
        onChangeIndex: PropTypes.func.isRequired,
    };

    handleClick = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
        this.props.onChangeIndex(index);
    };

    render() {
        const {index, dots, style, dotStyle, activeStyle} = this.props;

        const children = [];

        for (let i = 0; i < dots; i += 1) {
            children.push(
                <PaginationDot key={i}
                               index={i}
                               active={i === index}
                               dotStyle={dotStyle}
                               activeStyle={activeStyle}
                               onClick={this.handleClick}/>,
            );
        }

        return <div style={style || styles.root as any}>{children}</div>;
    }
}


export default Pagination;
