import React, { Component } from 'react';
import Column from '../Column';
import s from './Layout.scss';

export interface LayoutIProps {
  data: any[];
  value: any[];
  layoutCol: number;
  cascade: boolean; // 是否联级
  onPickerChange: (ele: any) => void;
}

export interface LayoutIState {
  defaultSelectedValue: any[];
}

class Layout extends Component<LayoutIProps, LayoutIState> {
  public static defaultProps = {
    value: [],
    cascade: true,
  };

  constructor(props: Readonly<LayoutIProps>) {
    super(props);
    this.state = {
      defaultSelectedValue: props.value || [],
    };
  }

  componentDidMount() {}

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

  getColumnsData = (params: { data: any; value: any; hasFind: any; deep: any }) => {
    const { data, value, hasFind, deep } = params;
    let hasChildren;
    const array: { id: any; value: any }[] = [];

    data.map((item: any, i: number) => {
      array.push({ id: item.id, value: item.value });

      if (Object.values(item).includes(value[deep])) {
        hasChildren = i;
        return;
      }

      if (value.length <= 0) {
        hasChildren = 0;
      }
    });

    hasFind.push(array);

    if (hasChildren === undefined) {
      return hasFind;
    }

    if (data[hasChildren].children) {
      this.getColumnsData({ data: data[hasChildren].children, value, hasFind, deep: deep + 1 });
    }

    return hasFind;
  };

  // 不关联 递归寻找value
  getValue = (params: { list: any; oldValue: any; newValue: any; deep: any }) => {
    const { list, oldValue, newValue, deep } = params;
    const { data } = this.props;
    let has;

    list.map((item: any) => {
      if (Object.values(item).includes(oldValue[deep])) {
        newValue.push({ id: item.id, value: item.value });
        has = deep + 1;
      }
    });

    if (has < data.length) this.getValue({ list: data[has], oldValue, newValue, deep: deep + 1 });

    return newValue;
  };

  handleValueChange = (params: { value: any; optIndex: any }) => {
    const { value, optIndex } = params;
    const { data, cascade, onPickerChange } = this.props;
    const { defaultSelectedValue } = this.state;

    const oldValue = defaultSelectedValue.slice();
    oldValue[optIndex] = value;

    if (cascade) {
      const newState = this.getNewValue({ data, oldValue, newValue: [], deep: 0 });

      const newSelected = [];
      for (const interator of newState) {
        newSelected.push(interator.value);
      }

      this.setState({ defaultSelectedValue: newSelected });

      onPickerChange(newState);
    } else {
      const newvalues = this.getValue({ list: data[0], oldValue, newValue: [], deep: 0 });
      const newSelected = [];
      for (const interator of newvalues) {
        newSelected.push(interator.value);
      }

      this.setState({ defaultSelectedValue: newSelected });
      onPickerChange(newvalues);
    }
  };

  getColumns = () => {
    const { data, layoutCol, cascade } = this.props;
    const { defaultSelectedValue } = this.state;

    const result = [];
    let newData = [];

    if (cascade) {
      newData = this.getColumnsData({ data, value: defaultSelectedValue, hasFind: [], deep: 0 });
    } else {
      newData = data;
    }

    for (let i = 0; i < layoutCol; i++) {
      result.push(
        <Column
          data={newData[i]}
          value={defaultSelectedValue[i]}
          key={i}
          onLayoutChange={this.handleValueChange}
          optIndex={i}
        />,
      );
    }

    return result;
  };

  render() {
    return <div className={s.pickerView}>{this.getColumns()}</div>;
  }
}

export default Layout;
