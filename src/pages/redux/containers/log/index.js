import React, { Component } from 'react';


/**
 * 历史记录组件
 */
export default class History extends Component {
    /**
     * constructor
     */
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    /**
     * 组件挂载完成时请求数据
     */
    componentDidMount() {
        this.getData();
    }

    // 查询历史
    getData = () => {
        fetch('http://localhost:8080/Calcu/getData.php', { method: 'get' })
            .then(res => res.json()).then((res) => {
                this.setState({ data: res });
            });
    };

    /**
     * 体部内容组件
     */
    render() {
        const { data } = this.state;
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
