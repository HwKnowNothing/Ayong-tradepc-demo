import React from 'react';
import PropTypes from 'prop-types';

/**
 * Animation组件
 * 计算时的动画
 */
export default function Animation(props) {
    const { isShow } = props;
    return (
        <div>
            <div className="loading" id="loading" style={{ display: isShow ? 'block' : 'none' }}>
                <div className="item-1" />
                <div className="item-2" />
                <div className="item-3" />
                <div className="item-4" />
                <div className="item-5" />
                <div className="item-6" />
            </div>
        </div>
    );
}

Animation.PropType = { isShow: PropTypes.bool.isRequired };
Animation.defaultProps = { isShow: false };
