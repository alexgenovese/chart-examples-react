import React from "react";
import { Col, Card } from 'antd';
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';
import useId from "uniqid";

const { DataView } = DataSet;

class TreeMap extends React.Component {
    _chart = null;
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
                let _last_data = res[res.length -1];

                let data = {
                    name: 'root',
                    children: [
                        {
                            name: 'Ricoverati con sintomi',
                            value: _last_data.terapia_intensiva
                        },
                        {
                            name: 'terapia_intensiva',
                            value: _last_data.terapia_intensiva
                        },
                        {
                            name: 'totale_ospedalizzati',
                            value: _last_data.totale_ospedalizzati
                        },
                        {
                            name: 'isolamento_domiciliare',
                            value: _last_data.isolamento_domiciliare
                        },
                        {
                            name: 'totale_attualmente_positivi',
                            value: _last_data.totale_attualmente_positivi
                        },
                        {
                            name: 'nuovi_attualmente_positivi',
                            value: _last_data.nuovi_attualmente_positivi
                        },
                        {
                            name: 'dimessi_guariti',
                            value: _last_data.dimessi_guariti
                        },
                        {
                            name: 'deceduti',
                            value: _last_data.deceduti
                        },
                        {
                            name: 'Totali Casi',
                            value: _last_data.totale_casi
                        },
                        {
                            name: 'Tamponi',
                            value: _last_data.tamponi
                        }
                    ]
                };
                return data;
            })
            .then((data) => {
                if (this._isMounted) {

                    const dv = new DataView();
                    dv.source(data, {
                        type: 'hierarchy',
                    }).transform({
                        field: 'value',
                        type: 'hierarchy.treemap',
                        tile: 'treemapResquarify',
                        as: ['x', 'y']
                    });

                    const nodes = [];
                    for (const node of dv.getAllNodes()) {
                        if (node.data.name === 'root') {
                            continue;
                        }

                        nodes.push({
                            name: node.data.name,
                            x: node.x,
                            y: node.y,
                            value: node.data.value
                        });
                    }

                    const chart = new Chart({
                        container: this.state._id,
                        autoFit: true,
                        height: 500
                    });

                    chart.data(nodes);

                    chart.scale({
                        x: {
                            nice: true,
                        },
                        y: {
                            nice: true,
                        }
                    });

                    chart.axis(false);
                    chart.legend(false);
                    chart.tooltip({
                        showTitle: false,
                        showMarkers: false,
                        itemTpl:
                            '<li style="list-style: none;">' +
                            '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
                            '{name}<br/>' +
                            '<span style="padding-left: 16px">浏览人数：{count}</span><br/>' +
                            '</li>',
                    });

                    chart
                        .polygon()
                        .position('x*y')
                        .color('name')
                        .tooltip('name*value', (name, count) => {
                            return {
                                name,
                                count,
                            };
                        })
                        .style({
                            lineWidth: 0.5,
                            stroke: '#fff'
                        })
                        .label('name', {
                                offset: 0,
                                style: {
                                textBaseline: 'middle',
                            },
                            content: (obj) => {
                                if (obj.name !== 'root') {
                                    return obj.name;
                                }
                            }
                        });

                    chart.interaction('element-active');
                    return chart;
                }
            })
            .then(resp => {
                this._chart = resp.render();
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

export default TreeMap;