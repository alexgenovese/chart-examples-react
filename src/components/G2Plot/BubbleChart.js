import React from "react";
import { Col, Card } from 'antd';
import { Bubble } from '@antv/g2plot';
import useId from "uniqid";

class BubbleChart extends React.Component {
    _bubbleChart = null;
    _isMounted = false;

    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            data: null,
            col: (!props.col) ? 6 : props.col,
            _id: null
        }
    }

    setRandomId(){
        this.setState({ _id: useId() });
    }

    componentDidMount(){

        this._isMounted = true;
        this.setRandomId();

        fetch('https://g2plot.antv.vision/en/examples/data/smoking-rate.json')
            .then((res) => res.json())
            .then((data) => {
                if (this._isMounted) {
                    return new Bubble(document.getElementById( this.state._id ), {
                        data,
                        xField: 'change in female rate',
                        yField: 'change in male rate',
                        sizeField: 'pop',
                        pointSize: [4, 30],
                        responsive: true,
                        colorField: 'continent',
                        color: ['#ffd500', '#82cab2', '#193442', '#d18768', '#7e827a'],
                        pointStyle: {
                            stroke: '#777777',
                            lineWidth: 1,
                            opacity: 0.8,
                        },
                        xAxis: {
                            visble: true,
                            max: 5,
                            min: -25,
                        },
                        quadrant: {
                            visible: true,
                            xBaseline: 0,
                            yBaseline: 0,
                            regionStyle: [
                            { fill: '#d8d0c0', opacity: 0.2 },
                            { fill: '#a3dda1', opacity: 0.1 },
                            { fill: 'white', opacity: 0 },
                            { fill: '#d8d0c0', opacity: 0.2 },
                            ],
                            label: {
                                text: [
                                    'Female decrease,\nmale increase',
                                    'Female & male decrease',
                                    'Female &\n male increase',
                                    'Male decrease,\nfemale increase',
                                ],
                            },
                        },
                    })
                }
            })
            .then(resp => {
                this._bubbleChart = resp.render();
            })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render(){
        return (
            <Col span={this.state.col}>
                <Card title={this.props.title} bordered={false}>
                    <div id={this.state._id}></div>
                </Card>
            </Col>
        )
    }

}

export default BubbleChart;