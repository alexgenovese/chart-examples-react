import React from "react";
import { Col, Card } from 'antd';
import { Line } from '@antv/g2plot';
import useId from "uniqid";

class LineChart extends React.Component {
    _lineplot = null;
    _isMounted = false;

    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            data: null,
            _id: null
        }
    }

    setRandomId(){
        this.setState({ _id: useId() });
    }

    componentDidMount(){

        this._isMounted = true;
        this.setRandomId();

        fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json')
            .then((res) => res.json())
            .then((res) => {
                let _data = [];
                res.forEach(element => {
                    _data.push({
                        data: element.data,
                        value: element.ricoverati_con_sintomi,
                        category: 'ricoverati_con_sintomi'
                    },{
                        data: element.data,
                        value: element.dimessi_guariti,
                        category: 'dimessi_guariti'
                    },
                    {
                        data: element.data,
                        value: element.terapia_intensiva,
                        category: 'terapia_intensiva'
                    },
                    {
                        data: element.data,
                        value: element.totale_casi,
                        category: 'totale_casi'
                    },
                    {
                        data: element.data,
                        value: element.deceduti,
                        category: 'deceduti'
                    }
                    )
                });
                return _data;
            })
            .then((data) => {
                if (this._isMounted) {
                    let _last_data = data[data.length-1];
                    return new Line(document.getElementById( this.state._id ), {
                        title: {
                            visible: true,
                            text: 'Dati aggiornati al ' + new Date(_last_data.data).toLocaleDateString().split(', ')[0],
                        },
                        description: {
                            visible: true,
                            text: 'Fonte dati Istituto Sanitario Nazionale',
                        },
                        forceFit: true,
                        data,
                        responsive: true,
                        padding: 'auto',
                        xField: 'data',
                        yField: 'value',
                        seriesField: 'category',
                        lineStyle: (d) => {
                            if (d === 'totale_casi') {
                                return {
                                    lineDash: [2, 2],
                                    opacity: 1,
                                }
                            }
                        },
                        xAxis: {
                            type: 'time',
                        },
                        yAxis: {
                            label: {
                                formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
                            },
                        },
                        smooth: false,
                        point: {
                            visible: true,
                        },
                        label: {
                            visible: false,
                            type: 'point',
                        }
                    })
                }
            })
            .then(resp => {
                this._linePlot = resp.render();
            })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render(){
        return (
            <Col span={this.props.col}>
                <Card title={this.props.title} bordered={false}>
                    <div id={this.state._id}></div>
                </Card>
            </Col>
        )
    }

}

export default LineChart;