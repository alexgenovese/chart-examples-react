import React, { Component } from 'react'
import Area from './chart-types/Area'
import Bar from './chart-types/Bar'
import Column from './chart-types/Column'
import Line from './chart-types/Line'
import Donut from './chart-types/Donut'
import RadialBar from './chart-types/RadialBar'
import { Layout, Row, Col, Card } from 'antd'

const { Content } = Layout

// https://github.com/apexcharts/react-apexcharts

class App extends Component {

    constructor (props) {
      super(props)
  
      this.changeChart = this.changeChart.bind(this)
  
      this.state = {
        selectedChart: 'line'
      }
    }
  
    changeChart (e) {
      this.setState({selectedChart: e.target.value})
    }
  
    render () {
      return (
        <Content style={{ padding: '0 50px' }}>
          <div className="site-card-wrapper">
            <Row gutter={[16, 16]}>
              <Col span="24">
                <Card title="Line Chart" bordered="false">
                  
                  <select id="lang" value={this.state.selectedChart} onChange={this.changeChart}>
                    <option value="line" >Line</option>
                    <option value="area" >Area</option>
                    <option value="bar" >Bar</option>
                    <option value="column" >Column</option>
                    <option value="radialbar" >RadialBar</option>
                    <option value="donut" >Donut</option>
                  </select>
          
                  { this.state.selectedChart === 'area' ? (<Area></Area>) : null}
                  { this.state.selectedChart === 'bar' ? (<Bar></Bar>) : null}
                  { this.state.selectedChart === 'line' ? (<Line></Line>) : null}
                  { this.state.selectedChart === 'column' ? (<Column></Column>) : null}
                  { this.state.selectedChart === 'radialbar' ? (<RadialBar></RadialBar>) : null}
                  { this.state.selectedChart === 'donut' ? (<Donut></Donut>) : null}
                </Card>
              </Col>
          </Row>
          </div>
        </Content>
      )
    }
  }
  
  export default App