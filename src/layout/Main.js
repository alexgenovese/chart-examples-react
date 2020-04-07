import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Home from '../components/Home'
import G2PlotComponent from '../components/G2Plot'
import G2Component from '../components/G2'
import ApexComponent from '../components/ApexCharts'
import Plotly from '../components/Plotly'

const { Content } = Layout;

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
    <Content>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/G2PlotComponent' component={G2PlotComponent}/>
            <Route path='/G2Component' component={G2Component}/>
            <Route path='/ApexComponent' component={ApexComponent} />
            <Route path='/Plotly' component={Plotly} />
        </Switch>
    </Content>
)

export default Main
