import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Picker, AddressPicker, PickerView } from '../../src/index';

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
      {
        value: '广东',
        id: 12,
        children: [
          {
            value: '广州',
            id: 1201,
            children: [{ value: '天河区', id: 120101 }],
          },
        ],
      },
    ];

    // const array8 = [
    //   [
    //     {
    //       value: '北京',
    //       id: 11,
    //     },
    //     {
    //       value: '广东',
    //       id: 12,
    //     },
    //     {
    //       value: '上海',
    //       id: 13,
    //     },
    //   ],
    // ];

    const array8 = [
      [
        {
          value: '北京',
          id: 11,
        },
        {
          value: '广东',
          id: 12,
        },
        {
          value: '上海',
          id: 13,
        },
      ],
      [
        {
          value: '北京',
          id: 1101,
        },
        {
          value: '广州',
          id: 1201,
        },
        {
          value: '上海',
          id: 1301,
        },
      ],
      [
        {
          value: '东城区',
          id: 110101,
        },
        {
          value: '天河',
          id: 120101,
        },
        {
          value: '浦东区',
          id: 130101,
        },
        { value: '西城区', id: 110102 },
        { value: '朝阳区', id: 110105 },
      ],
    ];
    return (
      <div className="container">
        <h4>Picker选择器 -- 选择省市区</h4>
        <Picker
          col={3}
          data={array8}
          value={['广东', '广州', '天河']}
          cascade={false}
          onConfirm={data => {
            console.log(data);
          }}
        ></Picker>
        <br />
        <br />
        {/* <AddressPicker
          col={3}
          // data={array3}
          // value={[
          //   {
          //     value: '北京',
          //     id: 11,
          //   },
          //   {
          //     value: '北京',
          //     id: 1101,
          //   },
          //   {
          //     value: '东城区',
          //     id: 110101,
          //   },
          // ]}
          onConfirm={data => {
            console.log(data);
          }}
        ></AddressPicker> */}
        <PickerView
          col={1}
          data={array8}
          cascade={false}
          value={[12]}
          onChange={data => {
            console.log(data, '1111');
          }}
        ></PickerView>
      </div>
    );
  }
}

export default hot(module)(App);
