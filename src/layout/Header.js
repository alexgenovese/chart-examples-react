import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'

const { Header } = Layout;

// The Header creates links that can be used to navigate
// between routes.
const HeaderComponent = () => (
    <Layout className="layout">
        <Header>
            <div className="logo"></div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link to='/'>Home</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/G2PlotComponent'>G2 Plot Library</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/G2Component'>G2 Library</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/ApexComponent'>Apex Library</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/Plotly'>Plotly Library</Link>
                </Menu.Item>
            </Menu>
        </Header>
    </Layout>
)

export default HeaderComponent
