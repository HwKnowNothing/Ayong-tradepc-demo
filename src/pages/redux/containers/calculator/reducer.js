import { CLICK_KEY, CLICK_AC, CLICK_OP, CLICK_EQUAL, LOAD, CLICK_POINT, CLICK_INVERT } from './action';

// 对页面prop 数据进行管理
const initialState = {
    // 输入框显示的内容
    textBox: '0',
    // 上一次输入的值
    perKey: '',
    // 控制动画的显隐
    isShow: false,
    // 是否带有 . 用于判断是否能在数字后加 .
    isPoint: false,
};
const defaultAction = { type: 'doNothing' };
const reg = /\+|-|×|÷|%|\.|AC/;

/**
 * 计算器reducer
 */
export default function index(state = initialState, action = defaultAction) {
    const { textBox, perKey } = state;
    const { payload } = action;
    switch (action.type) {
    case CLICK_KEY:
        return {
            ...state,
            textBox: textBox === '0' ? payload : textBox + payload,
            perKey: payload,
        };
    case CLICK_AC:
        return initialState;
    case CLICK_OP:
        if (perKey === '+' || perKey === '-' || perKey === '×' || perKey === '÷' || perKey === '%') {
            return {
                ...state,
                textBox: textBox.slice(0, -1) + payload,
                perKey: payload,
                isPoint: false,
            };
        }
        return {
            ...state,
            textBox: textBox + payload,
            perKey: payload,
            isPoint: false,
        };
    case CLICK_EQUAL:
        return {
            ...state,
            textBox: action.count,
            isShow: false,
        };
    case LOAD:
        return {
            ...state,
            isShow: true,
        };
    case CLICK_POINT:
        if (!state.isPoint) {
            return {
                ...state,
                textBox: reg.test(perKey) ? `${textBox}0.` : `${textBox}.`,
                isPoint: true,
            };
        }
        return state;
    case CLICK_INVERT: {
        const index = textBox.lastIndexOf(textBox.match(/(\d+)[^0-9]*$/)[1]); // 前一个字符的下标
        let temp;
        if (textBox[index - 1] !== '-') {
            temp = (`${textBox.slice(0, index)}-${textBox.slice(index)}`);
        } else {
            temp = (textBox.slice(0, index - 1) + textBox.slice(index));
        }
        return {
            ...state,
            textBox: temp,
        };
    }
    default:
        return state;
    }
}
