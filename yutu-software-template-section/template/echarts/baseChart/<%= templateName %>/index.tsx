import { memo, useMemo } from 'react';
import { xAxis, yAxisTwo } from 'src/assets/js/echartsAxis';
import tooltip from 'src/components/TooltipEChartsRange/tooltip';
import Empty from 'src/layout/Exception/Empty';
import Basic from 'src/components/EchartsComponents/Basic';
import {
  TREND_LEGEND,
  yAxisLeftName,
  yAxisRightName,
  data,
} from './chart-data';

const GRID = {
  x: 60,
  y: 50,
  x2: 70,
  y2: 30,
};

const <%= templateName %> = memo(function TrendNew() {
  // 计算X轴数据
  const axisX = useMemo(() => {
    if (!data?.length) return;
    return data.map((item) => item?.rankDate);
  }, []);

  //计算渲染字段
  const series = useMemo(() => {
    if (!data?.length) return [];
    return TREND_LEGEND.map((item) => {
      return {
        name: item.name,
        type: item.type,
        yAxisIndex: item.yAxisIndex,
        smooth: true,
        symbol: data?.length === 1 ? undefined : 'none',
        symbolSize: 10,
        itemStyle: {
          color: item.color,
        },
        data: data.map((i: any) => i[item.value] ?? 0),
      };
    });
  }, []);

  /** 图表配置项 */
  const option = useMemo(() => {
    if (!data?.length) return;
    return {
      grid: GRID,
      tooltip: tooltip,
      xAxis: {
        ...xAxis,
        data: axisX,
      },
      yAxis: yAxisTwo(yAxisLeftName, yAxisRightName),
      legend: {
        show: true,
        x: 'center',
        top: 0,
        textStyle: {
          color: '#889191',
        },
      },
      series: series,
    };
  }, [axisX, series]);

  return (
    <>
      {!data?.length && <Empty />}
      {!!data?.length && (
        <Basic option={option} style={{ width: '100%', height: 360 }} />
      )}
    </>
  );
});

export default <%= templateName %>;
