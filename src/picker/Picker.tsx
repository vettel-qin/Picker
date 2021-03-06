import React, { Component, Fragment } from 'react';
import Touchable from 'rc-touchable';
import classNames from 'classnames';
import Layout from '../components/layout';

export interface PickerIProps {
  cancelText?: string;
  title?: string;
  confirmText?: string;
  col: number;
  value: any[];
  data: any[];
  cascade?: boolean;
  onCancel?: () => void;
  onConfirm?: (ele: any) => void;
}

export interface PickerIState {
  showPopUp: boolean;
  selectedValue: string;
  selectedData: any[];
}

import s from './Picker.scss';

class Picker extends Component<PickerIProps, PickerIState> {
  public static defaultProps = {
    cancelText: '取消',
    title: '请选择',
    confirmText: '确定',
    col: 1,
    value: [],
  };

  constructor(props: Readonly<PickerIProps>) {
    super(props);
    this.state = {
      showPopUp: false,
      selectedValue: '',
      selectedData: [],
    };
  }

  componentDidMount() {
    this.handleGetValue();
  }

  handleClickOpen = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    this.setState({ showPopUp: true });
  };

  handleCancel = () => {
    const { onCancel } = this.props;

    if (onCancel) {
      onCancel();
    }

    this.handleClickClose();
  };

  handleConfirm = () => {
    const { onConfirm } = this.props;
    const { selectedData } = this.state;

    let selected = '';
    for (const interator of selectedData) {
      selected += interator.value;
    }

    this.setState({ selectedValue: selected }, () => {
      if (onConfirm) {
        onConfirm(selectedData);
      }

      this.handleClickClose();
    });
  };

  handleClickClose = () => {
    this.setState({ showPopUp: false });
  };

  handleLayoutChange = (params: any) => {
    this.setState({ selectedData: params });
  };

  getPopupDOM = () => {
    const { cancelText, title, confirmText } = this.props;
    const { showPopUp } = this.state;

    return (
      <Fragment>
        <Touchable>
          <div className={classNames([`${showPopUp && s.popupMask}`])}></div>
        </Touchable>
        <div className={`${s.picker} ${showPopUp && s.showPicker}`}>
          <div className={classNames([`${s.popupWrap} ${showPopUp && 'popup'}`])}>
            <div className={s.popupHeader}>
              <Touchable onPress={this.handleCancel}>
                <span className={`${s.popupItem} ${s.popupItemLeft}`}>{cancelText}</span>
              </Touchable>
              <span className={`${s.popupItem} ${s.popupItemTitle}`}>{title}</span>
              <Touchable onPress={this.handleConfirm}>
                <span className={`${s.popupItem} ${s.popupItemRight}`}>{confirmText}</span>
              </Touchable>
            </div>
            <div className={s.popupBody}>{this.getLayoutView()}</div>
          </div>
        </div>
      </Fragment>
    );
  };

  getLayoutView = () => {
    const { data, value, col, cascade } = this.props;

    return (
      <Layout layoutCol={col} data={data} cascade={cascade} value={value} onPickerChange={this.handleLayoutChange} />
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

  handleGetValue = () => {
    const { value, data, cascade } = this.props;

    if (!cascade) {
      let selected = '';
      for (const val of value) {
        selected += val;
      }

      this.setState({ selectedValue: value.length > 0 ? selected : '' });
      return;
    }

    const newData = this.getNewValue({ data, oldValue: value, newValue: [], deep: 0 });

    let selected = '';
    for (const interator of newData) {
      selected += interator.value;
    }

    this.setState({
      selectedValue: value.length > 0 ? selected : '',
      selectedData: newData,
    });
  };

  // 回调选中

  render() {
    const { selectedValue } = this.state;

    return (
      <Fragment>
        {this.getPopupDOM()}
        <Touchable onPress={this.handleClickOpen}>
          <div className={s.extra}>{selectedValue ? selectedValue : '请选择'}</div>
        </Touchable>
      </Fragment>
    );
  }
}

export default Picker;
