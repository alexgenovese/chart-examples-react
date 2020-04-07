import React from 'react'
import Header from './layout/Header'
import Main from './layout/Main'
import { Layout } from 'antd'

const { Footer } = Layout

const App = () => (
  <Layout>
    <Header />
    <Main />
    <Footer style={{ textAlign: 'center' }}>Alex Genovese &copy; - Graph Libraries Experiments</Footer>
  </Layout>
)

export default App