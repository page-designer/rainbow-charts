import React from 'react'
import { Line } from 'rainbow-charts'

const config = {
  id: 'comp_cc12fa',
  $pid: null,
  description: '',
  height: 267,
  isShow: true,
  hasSwitchTable: false,
  xtype: 'line',
  title: '二、实时累计收入',
  legendShow: true,
  legendPosition: 'top-left',
  smooth: true,
  labelShow: false,
  pointShow: false,
  pointShape: 'circle',
  pointSize: 3,
  transformColumns: '日期',
  transformDatas: '累计收入',
  isTransform: true
}

const data = {
  columns: ['日期', '日新增用户数'],
  list: [
    ['09-09', 10351],
    ['09-10', 10733],
    ['09-11', 11554],
    ['09-12', 17998],
    ['09-13', 17767],
    ['09-14', 10571],
    ['09-15', 10488],
    ['09-16', 10189],
    ['09-17', 11156],
    ['09-18', 13315],
    ['09-19', 23594],
    ['09-20', 21062],
    ['09-21', 11373],
    ['09-22', 12141],
    ['09-23', 11525],
    ['09-24', 12242],
    ['09-25', 15642],
    ['09-26', 22968],
    ['09-27', 16226],
    ['09-28', 19622],
    ['09-29', 19698],
    ['09-30', 33972],
    ['10-01', 43054],
    ['10-02', 51580],
    ['10-03', 65857],
    ['10-04', 59152],
    ['10-05', 66740],
    ['10-06', 53876],
    ['10-07', 49392],
    ['10-08', 37202]
  ]
}

const App = () => {
  return (
    <>
      <div
        style={{ display: 'inline-block', width: 400, height: 300, margin: 10 }}
      >
        <h3>折线图</h3>
        <Line item={config} sourceData={data} />
      </div>
    </>
  )
}

export default App
