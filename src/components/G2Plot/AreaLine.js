import React from "react"
import { Col, Card } from 'antd'
import { Area } from '@antv/g2plot'

class AreaChart extends React.Component {

    componentDidMount(){

        fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json')
            .then((res) => res.json())
            .then((data) => {
            const linePlot = new Area(document.getElementById('container-areachart'), 
                    {
                        data,
                        title: {
                            visible: true,
                            text: 'COVID-19',
                        },
                        description: {
                            visible: true,
                            text: 'Isolamento domiciliare',
                        },
                        xField: 'data',
                        yField: 'isolamento_domiciliare',
                        forceFit: true,
                        renderer: 'svg',
                        padding: 'auto',
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
                    <div id="container-areachart"></div>
                </Card>
            </Col>
        )
    }

}

export default AreaChart;