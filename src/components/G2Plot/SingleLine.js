import React from "react"
import { Col, Card } from 'antd'
import { Line } from '@antv/g2plot'

class LineChart extends React.Component {

    componentDidMount(){

        fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json')
            .then((res) => res.json())
            .then((data) => {
            const linePlot = new Line(document.getElementById('container-linechart'), 
                    {
                        title: {
                            visible: true,
                            text: 'COVID 19',
                        },
                        description: {
                            visible: true,
                            text: 'Terapia intensiva',
                        },
                        data,
                        xField: 'data',
                        yField: 'terapia_intensiva',
                        point: {
                            visible: true,
                        },
                        label: {
                            visible: true,
                            type: 'point',
                        }
                    }
                );

                linePlot.render();

            });
    }

    render(){

        return (
            <Col span={this.props.col}>
                <Card title={this.props.title} bordered={false}>
                    <div id="container-linechart"></div>
                </Card>
            </Col>
        )
    }

}

export default LineChart;