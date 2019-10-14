import { nameSpace } from 'utils/index';


const ns = nameSpace('calculator');
export const CLICK_KEY = ns('CLICK_KEY');
export const CLICK_AC = ns('CLICK_AC');
export const CLICK_OP = ns('CLICK_OP');
export const CLICK_EQUAL = ns('CLICK_EQUAL');
export const LOAD = ns('LOAD');
export const CLICK_POINT = ns('CLICK_POINT');
export const CLICK_INVERT = ns('CLICK_INVERT');

/**
 * 数字action
 */
export const clickKey = key => ({ type: CLICK_KEY, payload: key });
/**
 * AC(归零)action
 */
export const clickAC = () => ({ type: CLICK_AC });
/**
 * 运算符action
 */
export const clickOp = key => ({ type: CLICK_OP, payload: key });
/**
 * 动画显示
 */
export const load = () => ({ type: LOAD });
/**
 * 小数点
 */
export const clickPoint = () => ({ type: CLICK_POINT });
/**
 * 取反
 */
export const clickInvert = () => ({ type: CLICK_INVERT });

/**
 * 将计算结果存入数据库
 */
export function clickequal(textBox, count) {
    return (dispatch) => {
        fetch('http://localhost:8080/Calcu/addData.php', {
            method: 'POST',
            mode: 'no-cors',
            body: new URLSearchParams({
                textBox,
                count,
            }),
        }).then(dispatch({
            type: CLICK_EQUAL,
            count,
        })).catch(e => e);
    };
}
