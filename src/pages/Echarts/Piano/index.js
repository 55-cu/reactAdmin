import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import {Card} from 'antd';

class EchartsPiano extends Component{
    state={
        option:{
            angleAxis: {
            },
            radiusAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四'],
                z: 10
            },
            polar: {
            },
            series: [{
                type: 'bar',
                data: [1, 2, 3, 4],
                coordinateSystem: 'polar',
                name: 'A',
                stack: 'a'
            }, {
                type: 'bar',
                data: [2, 4, 6, 8],
                coordinateSystem: 'polar',
                name: 'B',
                stack: 'a'
            }, {
                type: 'bar',
                data: [1, 2, 3, 4],
                coordinateSystem: 'polar',
                name: 'C',
                stack: 'a'
            }],
            legend: {
                show: true,
                data: ['A', 'B', 'C']
            }
        }
    }
    render(){
        return(
        <div>
         <Card title="钢琴图">
          <ReactEcharts option={this.state.option}
          >
          </ReactEcharts>
         </Card>
        </div>
        )
    }
}

export default EchartsPiano;