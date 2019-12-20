import React, { Component } from 'react';
import PickerColumn from './components/PickerColumn';
import s from './PickerView.scss';

export interface PickerViewIProps {
  data: any[];
  value: any[];
  pickerViewCol: number;
  onPickerChange: (ele: any) => void;
}

export interface PickerViewIState {
  defaultSelectedValue: any[];
}

class PickerView extends Component<PickerViewIProps, PickerViewIState> {
  public static defaultProps = {
    value: [],
  };

  constructor(props: Readonly<PickerViewIProps>) {
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

    data.map((item, i) => {
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

  handleValueChange = (params: { value: any; optIndex: any }) => {
    const { value, optIndex } = params;
    const { data, onPickerChange } = this.props;
    const { defaultSelectedValue } = this.state;

    const oldValue = defaultSelectedValue.slice();
    oldValue[optIndex] = value;

    const newState = this.getNewValue({ data, oldValue, newValue: [], deep: 0 });

    const newSelected = [];
    for (const interator of newState) {
      newSelected.push(interator.value);
    }

    this.setState({ defaultSelectedValue: newSelected });

    onPickerChange(newState);
  };

  getColumns = () => {
    const { data, pickerViewCol } = this.props;
    const { defaultSelectedValue } = this.state;

    const result = [];
    let newData = [];

    newData = this.getColumnsData({ data, value: defaultSelectedValue, hasFind: [], deep: 0 });

    for (let i = 0; i < pickerViewCol; i++) {
      result.push(
        <PickerColumn
          data={newData[i]}
          value={defaultSelectedValue[i]}
          key={i}
          onPickerViewChange={this.handleValueChange}
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

export default PickerView;
