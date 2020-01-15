import React, { Component } from 'react';
import classNames from 'classnames';
import ZScroller from 'zscroller';

import s from './Column.scss';

export interface ColumnIProps {
  value?: string;
  optIndex: number;
  data: any[];
  onLayoutChange: (ele: any) => void;
}

export interface ColumnIState {}

class Column extends Component<ColumnIProps, ColumnIState> {
  public static defaultProps = {
    value: '',
  };

  private zscroller: any;
  private contentRef: any;
  private itemHeight!: number;
  private indicator: any;

  constructor(props: Readonly<ColumnIProps>) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.itemHeight = this.indicator.getBoundingClientRect().height;
    if (this.itemHeight !== 0) {
      // 绑定事件
      this.bindScrollEvent();
      // 列表滚到对应位置
      this.scrollToPosition();
      return;
    }
  }

  componentDidUpdate() {
    this.zscroller.reflow();
    this.scrollToPosition();
  }

  componentWillUnmount() {
    this.zscroller.destroy();
  }

  bindScrollEvent() {
    // 绑定滚动的事件
    const content = this.contentRef;
    // getBoundingClientRect js原生方法
    this.itemHeight = this.indicator.getBoundingClientRect().height;

    // 最后还是用了何一鸣的zscroll插件
    // 但是这个插件并没有太多的文档介绍 gg
    // 插件demo地址：http://yiminghe.me/zscroller/examples/demo.html
    const t = this;
    this.zscroller = new ZScroller(content, {
      scrollbars: false,
      scrollingX: false,
      snapping: true, // 滚动结束之后 滑动对应的位置
      penetrationDeceleration: 0.1,
      minVelocityToKeepDecelerating: 0.5,
      scrollingComplete() {
        // 滚动结束 回调
        t.scrollingComplete();
      },
    });

    // 设置每个格子的高度 这样滚动结束 自动滚到对应格子上
    // 单位必须是px 所以要动态取一下
    this.zscroller.scroller.setSnapSize(0, this.itemHeight);
  }

  scrollingComplete = () => {
    // 滚动结束 判断当前选中值
    const { top } = this.zscroller.scroller.getValues();

    const { data, onLayoutChange, value, optIndex } = this.props;
    let currentIndex = top / this.itemHeight;
    const floor = Math.floor(currentIndex);
    if (currentIndex - floor > 0.5) {
      currentIndex = floor + 1;
    } else {
      currentIndex = floor;
    }
    let selectedValue;

    if (data[currentIndex]) {
      selectedValue = data[currentIndex].value;
    }

    if (selectedValue && selectedValue !== value) {
      // 值发生变化 通知父组件
      onLayoutChange({ ...data[currentIndex], optIndex });
    }
  };

  scrollToPosition = () => {
    // 滚动到选中的位置

    const { data, value } = this.props;

    for (let i = 0; i < data.length; i++) {
      if (Object.values(data[i]).includes(value)) {
        this.selectByIndex(i);
        return;
      }
    }

    this.selectByIndex(0);
  };

  selectByIndex = (index: number) => {
    // 滚动到index对应的位置
    const top = this.itemHeight * index;

    this.zscroller.scroller.scrollTo(0, top);
  };

  getCols = () => {
    const { data } = this.props;

    return data.map((item, i) => (
      <div className={classNames([`${s.columnCol}`])} key={i}>
        {item.value}
      </div>
    ));
  };

  render() {
    return (
      <div className={s.column}>
        <div className={s.columnList}>
          <div className={s.columnWindow} />
          <div
            className={s.columnIndicator}
            ref={ele => {
              this.indicator = ele;
            }}
          />
          <div
            className={s.columnContent}
            ref={ele => {
              this.contentRef = ele;
            }}
          >
            {/* col：组件应该显示的列数 */}
            {this.getCols()}
          </div>
        </div>
      </div>
    );
  }
}

export default Column;
