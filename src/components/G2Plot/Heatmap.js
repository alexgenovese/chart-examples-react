import React from "react";
import { Col, Card } from 'antd';
import { Heatmap } from '@antv/g2plot';
import useId from "uniqid";

class HeatmapChart extends React.Component {
    _heatmapChart = null;
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

        fetch('https://gw.alipayobjects.com/os/basement_prod/a719cd4e-bd40-4878-a4b4-df8a6b531dfe.json')
            .then((res) => res.json())
            .then((data) => {
                if (this._isMounted) {
                    return new Heatmap(document.getElementById( this.state._id ), {
                        forceFit: true,
                        data,
                        xField: 'Month of Year',
                        yField: 'District',
                        colorField: 'AQHI',
                        shapeType: 'rect',
                        responsive: true,
                        color: ['#174c83', '#7eb6d4', '#efefeb', '#efa759', '#9b4d16'],
                        meta: {
                            'Month of Year': {
                            type: 'cat',
                            },
                        },
                    })
                }
            })
            .then(resp => {
                this._heatmapChart = resp.render();
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

export default HeatmapChart;