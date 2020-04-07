import React from "react"
import { Col, Card } from 'antd'
import { Bar } from '@antv/g2plot'
import useId from "uniqid"

class BarChart extends React.Component {
    _barChart = null;
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
                    const data = [
                        { action: 'Awareness', pv: 50000 },
                        { action: 'Consideration', pv: 35000 },
                        { action: 'Purchase', pv: 25000 },
                        { action: 'Loyalty', pv: 15000 },
                        { action: 'Advocacy', pv: 8500 },
                    ];
                    return new Bar(document.getElementById( this.state._id ), {
                        title: {
                            visible: true,
                            text: 'Titolo',
                        },
                        description: {
                            visible: true,
                            text: 'Descrizione',
                        },
                        forceFit: true,
                        responsive: true,
                        data,
                        xField: 'pv',
                        yField: 'action',
                            conversionTag: {
                            visible: true,
                        }
                    })
                }
            })
            .then(resp => {
                this._barChart = resp.render();
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

export default BarChart;