import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Picker } from '../../src/index';

class App extends Component {
  componentWillMount() {}

  render() {
    const array3 = [
      {
        value: '北京',
        id: 11,
        children: [
          {
            value: '北京',
            id: 1101,
            children: [
              { value: '东城区', id: 110101 },
              { value: '西城区', id: 110102 },
              { value: '朝阳区', id: 110105 },
              { value: '丰台区', id: 110106 },
              { value: '石景山区', id: 110107 },
              { value: '海淀区', id: 110108 },
              { value: '门头沟区', id: 110109 },
              { value: '房山区', id: 110111 },
              { value: '通州区', id: 110112 },
              { value: '顺义区', id: 110113 },
              { value: '昌平区', id: 110114 },
              { value: '大兴区', id: 110115 },
              { value: '怀柔区', id: 110116 },
              { value: '平谷区', id: 110117 },
              { value: '密云县', id: 110228 },
              { value: '延庆县', id: 110229 },
            ],
          },
        ],
      },
    ];
    return (
      <div className="container">
        <h4>Picker选择器 -- 选择省市区</h4>
        <Picker
          col={3}
          data={array3}
          onConfirm={data => {
            console.log(data);
          }}
        ></Picker>
      </div>
    );
  }
}

export default hot(module)(App);
