import React, { Component } from 'react';


/**
 * Analyse组件
 */
export default class Analyse extends Component {
    /**
     * constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            // 请求时的参数
            params: {
                app: 'trade',
                start: '2019-09-09',
                end: '2019-09-25',
                pageno: 1,
                pagesize: 7,
            },
            // 遍历表格的数组
            anaData: [],
            // 总页数
            sumPage: 0,
        };
    }

    /**
     * 组件挂载完后
     */
    componentDidMount() {
        this.getAnalyse();
    }

    // 调用接口的函数
    getAnalyse = () => {
        const { params } = this.state;
        fetch('http://ittool.aiyongbao.com/api/getdayreport', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
            body: new URLSearchParams(params).toString(),
        })
            .then((res) => {
                res.json().then((result) => {
                    this.setState({
                        anaData: result.content,
                        sumPage: Math.ceil(result.num / params.pagesize),
                    });
                });
            });
    };

    // 改变日期
    changeDate = (attr, e) => {
        const { params } = this.state;
        this.setState({
            params: {
                ...params,
                [attr]: e.target.value,
            },
        });
    };

    // 改变表格行数
    changeSize = (e) => {
        const { params } = this.state;
        this.setState({
            params: {
                ...params,
                pagesize: e.target.value,
            },
        }, this.getAnalyse);
    };

    // 上一页
    perPage = () => {
        const { params } = this.state;
        if (params.pageno === 1) {
            alert('没有上一页了');
        } else {
            this.setState({
                params: {
                    ...params,
                    pageno: params.pageno - 1,
                },
            }, this.getAnalyse);
        }
    };

    // 下一页
    nextPage = () => {
        const { params, sumPage } = this.state;
        if (params.pageno === sumPage) {
            alert('没有下一页了');
        } else {
            this.setState({
                params: {
                    ...params,
                    pageno: params.pageno + 1,
                },
            }, this.getAnalyse);
        }
    };

    // 查询
    inquirie = () => {
        this.getAnalyse();
    };

    /**
     * 渲染
     */
    render() {
        const { params, sumPage, anaData } = this.state;
        const sizeArr = [5, 6, 7];
        const tableArr = ['日期', '付费人数', '免费人数', '客单价', '总收入', '到期(人)', '新订(单)', '续订(单)', '升级(单)', '后台(单)', '续订率', '一个月(单)', '一季度(单)', '半年(单)', '一年(单)', '来源'];
        return (
            <div className="content-body" id="data-tab">
                <div className="content-select">
                    <select name="1" className="select-1">
                        <option value="交易">交易</option>
                        <option value="交易">交易</option>
                    </select>
                    <select name="1" className="select-1" defaultValue={params.pagesize} onChange={this.changeSize}>
                        {sizeArr.map(item => (<option value={item} key={item}>{item}</option>))}
                    </select>
                    <span>日期选择</span>
                    <input type="date" className="date-input" defaultValue={params.start} onChange={this.changeDate.bind(this, 'start')} />
                    -
                    <input type="date" className="date-input" defaultValue={params.end} onChange={this.changeDate.bind(this, 'end')} />
                    <button className="btn" onClick={this.inquirie} type="button">查询</button>
                    <button className="btn1" type="button">同步</button>
                    <span>
                        交易上次手动同步时间: 2019-09-25 10:09:36
                    </span>
                </div>
                <div className="content-table">
                    <table id="table">
                        <thead>
                            <tr>
                                {tableArr.map(item => (
                                    <th key={item}>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            {
                                anaData.map(item => (
                                    <tr key={item.id}>
                                        <td style={{ color: '#56b1ec' }}>{item.day}</td>
                                        <td>{item.payorder}</td>
                                        <td>{item.freeorder}</td>
                                        <td>{item.singleprice}</td>
                                        <td>{item.totalprice}</td>
                                        <td>{item.vipafterdatenum}</td>
                                        <td>
                                            {item.neworder}
                                            (
                                            {item.aquartercycle}
                                        元)
                                        </td>
                                        <td>
                                            {item.againorder}
                                            (
                                            {item.sixmonthscycle}
                                            元)
                                        </td>
                                        <td>
                                            {item.updateorder}
                                            (
                                            {item.ayearcycle}
                                            元)
                                        </td>
                                        <td>{item.autoagainorder}</td>
                                        <td>{item.vipagainpaynum}</td>
                                        <td>{item.monthcycle}</td>
                                        <td>{item.aquartercycle}</td>
                                        <td>{item.sixmonthscycle}</td>
                                        <td>{item.ayearcycle}</td>
                                        <td style={{ color: '#56b1ec' }}>分析</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="page">
                        <span className="pagechange" onClick={this.perPage}>上一页</span>
                        <span>
                            <span id="current">{params.pageno}</span>
                            /
                            <span id="count">{sumPage}</span>
                        </span>
                        <span className="pagechange" onClick={this.nextPage}>下一页</span>
                    </div>
                </div>
            </div>
        );
    }
}
