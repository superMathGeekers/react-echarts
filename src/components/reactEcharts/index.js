/*
    eachrts基础组件
    @props  {option} 图表配置项
    @props  {style}  图表样式
    @props  {theme}  主题
*/
import React from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts';
import theme from './theme';
import _ from 'lodash';
require('./style.less');

const originStyle = {
  width: '100%',
  height: '350px',
};

class ReactEcharts extends React.Component {
  constructor(props) {
    super(props);
    this.chart = null;
    this.chartDOM = null;
  }

  componentDidMount() {
    this.initChart(this.props.option);
    window.addEventListener('resize', this.addEchartsResize);
  }

  componentDidUpdate(prevProps) {
    const { option, style } = this.props;

    if (option !== prevProps.option) {
      this.initChart(option);
    } else if (
      this.chartDOM.clientWidth !== this.chart.getWidth() ||
      this.chartDOM.clientHeight !== this.chart.getHeight() ||
      JSON.stringify(style) !== JSON.stringify(prevProps.style)
    ) {
      this.chart.resize();
    }
  }

  addEchartsResize = () => {
    _.debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 150)();
  };

  initChart(option = {}) {
    if (this.chart) {
      this.chart.clear();
      this.chart.dispose();
    }

    // 初始化echarts
    if (this.props.theme) {
      this.chart = echarts.init(this.chartDOM, this.props.theme);
    } else {
      this.chart = echarts.init(this.chartDOM, theme);
    }

    this.chart.showLoading('default', {
      text: '正在查询数据...',
      color: '#5C8CF3',
      textColor: '#000',
      maskColor: 'rgba(0, 0, 0, 0)',
      zlevel: 0,
    });

    if (option.series && option.series.length) {
      this.chart.setOption(option);
    }
    this.chart.hideLoading();
  }

  componentWillUnmount() {
    // 销毁实例
    if (this.chart) {
      this.chart.clear();
      this.chart.dispose();
    }

    window.removeEventListener('resize', this.addEchartsResize);
  }

  render() {
    const { option = {}, style = {} } = this.props;
    return (
      <div className="react-echarts">
        <div
          className="echarts-root"
          ref={div => (this.chartDOM = div)}
          style={{
            ...originStyle,
            ...style,
          }}
        />
        {!(option.series && option.series.length) && (
          <div className="default-text">没有查到数据...</div>
        )}
      </div>
    );
  }
}

ReactEcharts.propTypes = {
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  option: PropTypes.object,
};

export default ReactEcharts;