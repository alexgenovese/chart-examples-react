import React from "react"
import { Row } from 'antd'
import Plot from './Plot'
import { Layout } from 'antd'

const { Content } = Layout

class Dashboard extends React.Component {
    render(){
        return (
            <Content style={{ padding: '0 50px' }}>
                <div className="site-card-wrapper">
                    <Row gutter={[16, 16]}>
                        <Plot col="24" title="Plotly - Line Chart" />
                    </Row>
                </div>
            </Content>
        )
    }
}

export default Dashboard