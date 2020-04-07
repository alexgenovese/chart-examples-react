import React from 'react'
import { Col, Card } from 'antd'
import { LineChart } from '@opd/g2plot-react'

class LinePlot extends React.Component {

  render(){
    const config = {
      height: 400,
      title: {
        visible: true,
        text: 'Titolo',
      },
      description: {
        visible: true,
        text: 'Descrizione',
      },
      padding: 'auto',
      forceFit: true,
      xField: 'year',
      yField: 'value',
      label: {
        visible: true,
        type: 'point',
      },
      point: {
        visible: true,
        size: 5,
      },
      xAxis: {
        tickCount: 10,
      },
      data: [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 11 },
      ],
    }
    return (
      <Col span={this.props.col}>
        <Card title={this.props.title} bordered={false}>
          <LineChart {...config} />
          </Card>
      </Col>
    )

  }

}

export default LinePlot;