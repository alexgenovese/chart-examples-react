import React from "react";
import { Col, Card } from 'antd';
import { Liquid } from '@antv/g2plot';
import useId from "uniqid";

class LiquidChart extends React.Component {
    _liquidplot = null;
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
            .then((data) => {
                let _last_data = data[data.length-1];
                if (this._isMounted) {
                    return new Liquid(document.getElementById( this.state._id ), {
                        title: {
                            visible: true,
                            text: 'Totale decessi',
                        },
                        min: 0,
                        max: _last_data.totale_casi,
                        value: _last_data.deceduti,
                        responsive: true,
                        forceFit: true,
                        statistic: {
                            formatter: (value) => ((100 * _last_data.deceduti) / _last_data.totale_casi).toFixed(1) + '%',
                        }
                    })
                }
            })
            .then(resp => {
                this._liquidplot = resp.render();
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

export default LiquidChart;