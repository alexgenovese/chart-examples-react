import React from 'react'
import { Typography, Layout, Row, Col, Card } from 'antd'

const { Paragraph } = Typography
const { Content } = Layout

const App = () => (
  <Content style={{ padding: '0 50px' }}>
    <div className="site-card-wrapper">
      <Row gutter={[16, 16]}>
        <Col span="24">
          <Card title="Home Page">
            <Typography>
              <Paragraph>
                In the process of internal desktop applications development, many different design specs and
                implementations would be involved, which might cause designers and developers difficulties and
                duplication and reduce the efficiency of development.
              </Paragraph>
            </Typography>
          </Card>
        </Col>
      </Row>
    </div>
  </Content>
)

export default App