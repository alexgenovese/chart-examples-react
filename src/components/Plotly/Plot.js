import React from 'react'
import { Col, Card } from 'antd'
import Plot from 'react-plotly.js'

// https://github.com/plotly/react-plotly.js/blob/master/README.md
// https://plotly.com/javascript/react/#advanced-usage
// 
class App extends React.Component {

    constructor(props){
        super(props)
        this.state = { data: [], layout: {}, frames: [], config: {responsive: true, staticPlot: true, displaylogo: false} };
    }

    componentDidMount(){
        var trace1 = {
            x: [1, 2, 3, 4],
            y: [10, 15, 13, 17],
            type: 'scatter',
            name: 'Linea 1',
            marker: {
                color: '#C8A2C8',
                line: {
                    width: 2.5
                }
            }
        };
        
        var trace2 = {
            x: [1, 2, 3, 4],
            y: [16, 5, 11, 9],
            type: 'scatter',
            name: 'Linea 2',
            marker: {
                color: '#C8A211',
                line: {
                    width: 2.5
                }
            }
        };
        var data = [trace1, trace2];
        this.setState({data: data});
        this.setState({layout: {width: 840, height: 480, title: 'A Line Chart', showlegend: true, font: {size: 12, family: 'Verdana'} } });
    }

    render() {
        return (
            <Col span={this.props.col}>
                <Card title={this.props.title} bordered={false}>
                    <Plot
                        data={this.state.data}
                        layout={this.state.layout}
                        frames={this.state.frames}
                        config={this.state.config}
                        onInitialized={(figure) => this.setState(figure)}
                        onUpdate={(figure) => this.setState(figure)}
                    />
                </Card>
            </Col>
        )
    }
}

export default App;