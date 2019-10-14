import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getData } from './action';

/**
 * 历史记录组件
 */
class History extends Component {

    /**
     * 组件挂载完成时请求数据
     */
    componentDidMount() {
        const { getData } = this.props;
        getData();
    }

    /**
     * 体部内容组件
     */
    render() {
        const { data } = this.props;
        return (
            <div className="history">
                <table>
                    <thead>
                        <tr>
                            <th>输入</th>
                            <th>输出</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(item => (
                                <tr key={item.id}>
                                    <td>{item.import}</td>
                                    <td>{item.export}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default connect(
    state => state.Log,
    { getData },
)(History);
