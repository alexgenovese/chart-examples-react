import React from "react";
import { Col, Card } from 'antd';
import { Scatter } from '@antv/g2plot';
import useId from "uniqid";

class ScatterChart extends React.Component {
    _scatterPlot = null;
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

        fetch('https://gw.alipayobjects.com/os/basement_prod/7a78a36d-c97c-459d-9090-9e664cd17167.json')
            .then((res) => res.json())
            .then((data) => {
                if (this._isMounted) {
                    return new Scatter(document.getElementById( this.state._id ), {
                        data,
                        xField: 'Revenue (Millions)',
                        yField: 'Rating',
                        colorField: 'Genre',
                        responsive: true,
                        color: ['#d62728', '#2ca02c', '#000000', '#9467bd', '#ffd500', '#1f77b4', '#00518a', '#ffbc69', '#9bd646'],
                        pointStyle: {
                            fillOpacity: 1,
                        },
                        xAxis: {
                            visible: true,
                            min: -5,
                        },
                    })
                }
            })
            .then(resp => {
                this._scatterPlot = resp.render();
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

export default ScatterChart;