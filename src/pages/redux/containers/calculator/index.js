import React, { Component } from 'react';
import { evaluate } from 'mathjs';
import { connect } from 'react-redux';

import Animation from 'components/loading/animation';
import { clickKey, clickAC, clickOp, clickequal, load, clickPoint, clickInvert } from './action';

/**
 * Calcu组件
 */
class Calcu extends Component {
    /**
     * constructor
     */
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (e) => {
        const { clickAC, clickOp, clickKey, load, clickPoint, clickInvert } = this.props;
        const key = e.target.innerText;
        switch (key) {
        case 'AC':
            clickAC();
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
        case '%':
            clickOp(key);
            break;
        case '=': {
            load();
            setTimeout(this.stop, 1500);
            break;
        }
        case '+/-':
            clickInvert();
            break;
        case '.':
            clickPoint();
            break;
        default:
            clickKey(key);
            break;
        }
    };

    stop = () => {
        const { textBox, clickequal } = this.props;
        let str = textBox;
        let count;
        str = str.replace(/×/g, '*');
        str = str.replace(/÷/g, '/');
        try {
            count = String(evaluate(str));
        } catch (e) {
            count = 'Error...';
        }
        clickequal(textBox, count);
    };

    /**
     * 渲染
     */
    render() {
        const keyArr = ['AC', '+/-', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];
        const { isShow, textBox } = this.props;
        return (
            <div>
                <div className="containerCalcu">
                    <div className="headerCalcu">
                        <div className="btn1" />
                        <div className="btn2" />
                        <div className="btn3" />
                    </div>
                    <div className="calculate" id="calue">
                        <div className="count" id="num">
                            {textBox}
                        </div>
                        <div className="key-board">
                            {keyArr.map((item, index) => (
                                <div
                                    key={item}
                                    className={`key${index + 1}`}
                                    onClick={this.handleClick}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* 计算时的动画 */}
                    <Animation isShow={isShow} />
                </div>
            </div>
        );
    }
}

export default connect(
    state => state.Calculator,
    { clickKey, clickAC, clickOp, clickequal, load, clickPoint, clickInvert },
)(Calcu);
