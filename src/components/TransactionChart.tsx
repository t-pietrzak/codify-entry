// we need to implement echart library in react, as far as I know there is no good library for this (for example echarts-for-react was updated 3 years ago).
// to make implementation quicker I used code from article on medium (https://dev.to/manufac/using-apache-echarts-with-react-and-typescript-353k)

import { useRef, useEffect } from "react";
import { init, getInstanceByDom } from "echarts";
import type { CSSProperties } from "react";
import type { EChartsOption, ECharts, SetOptionOpts } from "echarts";

export interface TransactionChartProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: "light" | "dark";
}

export const TransactionChart = ({
  option,
  style,
  settings,
  loading,
  theme,
}: TransactionChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener("resize", resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      if(chart) {chart.setOption(option, settings)};
    }
  }, [option, settings, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      if(chart){loading === true ? chart.showLoading() : chart.hideLoading()};
    }
  }, [loading, theme]);

  return <div ref={chartRef} style={{ width: "100%", height: "100%", ...style }} />;
}