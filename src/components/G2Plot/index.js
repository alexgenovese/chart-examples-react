import React from "react"
import { Row } from 'antd'
import Antv from './Antv'
import AreaLine from './AreaLine'
import BarChart from "./BarChart"
import BubbleChart from "./BubbleChart"
import Heatmap from './Heatmap'
import LineChart from './LineChart'
import Liquid from './LiquidChart'
import OPD from './OPD'
import Scatter from './ScatterChart'
import SingleLine from './SingleLine'
import { Layout } from 'antd'

const { Content } = Layout;

class Dashboard extends React.Component {
    render(){
        return (
            <Content style={{ padding: '0 50px' }}>
                <div className="site-card-wrapper">
                    <Row gutter={[16, 16]}>
                        <Antv col="12" title="Antv Chart" />
                        <AreaLine col="12" title="AreaLine Chart" />
                    </Row>
                </div>
                <div className="site-card-wrapper">
                    <Row gutter={[16, 16]}>
                        <BarChart col="12" title="Bar Chart" />
                        <BubbleChart col="12" title="BubbleChart" />
                    </Row>
                </div>
                <div className="site-card-wrapper">
                    <Row gutter={[16, 16]}>
                        <LineChart col="12" title="LineChart" />
                        <Liquid col="12" title="Deceduti su Totale Casi accertati" />
                    </Row>
                </div>
                <div className="site-card-wrapper">
                    <Row gutter={[16, 16]}>
                        <Scatter col="12" title="Scatter" />
                        <SingleLine col="12" title="SingleLine" />
                    </Row>
                </div>
                <div className="site-card-wrapper">
                    <Row gutter={[16, 16]}>
                        <Heatmap col="12" title="Heatmap" />
                        <OPD col="12" title="OPD Chart" />
                    </Row>
                </div>
            </Content>
        )
    }
}

export default Dashboard