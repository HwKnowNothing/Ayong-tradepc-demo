import { nameSpace } from 'utils/index';


const ns = nameSpace('log');
export const GET_DATA = ns('GET_DATA');
export const getLog = res => ({ type: GET_DATA, res });

export function getData() {
    return (dispatch) => {
        fetch('http://localhost:8080/Calcu/getData.php', { method: 'GET' })
            .then(res => res.json()).then((res) => {
                dispatch(getLog(res));
            });
    };
}
