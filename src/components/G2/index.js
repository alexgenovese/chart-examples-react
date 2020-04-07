import React from "react"
import { Layout, Row } from 'antd'
import TreeMap from './TreeMap'

const { Content } = Layout

class Dashboard extends React.Component {
    render(){
        return (
            <Content style={{ padding: '0 50px' }}>
                <div className="site-card-wrapper">
                    <Row gutter={[16, 16]}>
                        <TreeMap col="24" title="TreeMap" />
                    </Row>
                </div>
            </Content>
        )
    }
}

export default Dashboard