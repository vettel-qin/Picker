import React, { Component } from 'react';
import Layout from '../components/layout';

export interface PickerIProps {
  cancelText?: string;
  title?: string;
  confirmText?: string;
  col: number;
  value: any[];
  data: any[];
  cascade?: boolean;
  onChange: (ele: any) => void;
}

export interface PickerIState {
  showPopUp: boolean;
  selectedValue: string;
  selectedData: any[];
}

class PickerView extends Component<PickerIProps, PickerIState> {
  public static defaultProps = {
    cancelText: '取消',
    title: '请选择',
    confirmText: '确定',
    col: 1,
    value: [],
    cascade: true,
    data: [],
  };

  constructor(props: Readonly<PickerIProps>) {
    super(props);
    this.state = {
      showPopUp: false,
      selectedValue: '',
      selectedData: [],
    };
  }

  componentDidMount() {}

  handleLayoutChange = (params: any) => {
    const { onChange } = this.props;
    onChange(params);

    this.setState({ selectedData: params });
  };

  getLayoutView = () => {
    const { data, value, col, cascade } = this.props;

    if (data.length < col) {
      console.log('列数与数据源列数不一致');
      return;
    }

    return (
      <Layout layoutCol={col} data={data} value={value} cascade={cascade} onPickerChange={this.handleLayoutChange} />
    );
  };

  // 递归寻找value
  getNewValue = (params: { data: any; oldValue: any; newValue: any; deep: any }) => {
    const { data, oldValue, newValue, deep } = params;
    let has;

    data.map((item: any, i: number) => {
      if (Object.values(item).includes(oldValue[deep])) {
        newValue.push({ id: item.id, value: item.value });
        has = i;
      }
    });

    if (has === undefined) {
      has = 0;
      newValue.push({ id: data[has].id, value: data[has].value });
    }

    if (data[has].children) this.getNewValue({ data: data[has].children, oldValue, newValue, deep: deep + 1 });

    return newValue;
  };

  render() {
    return <div>{this.getLayoutView()}</div>;
  }
}

export default PickerView;
