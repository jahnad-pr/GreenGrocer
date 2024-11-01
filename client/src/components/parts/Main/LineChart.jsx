import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts'; // Ensure you have this import
import ReactDOM from 'react-dom';

const LineChart = () => {
  const [series] = useState([{
    name: 'Sales',
    data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
  }]);

  const options = {
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false // Hide the toolbar
      }
    },
    stroke: {
      width: 5,
      curve: 'smooth'
    },
    xaxis: {
      show: false, // Hide x-axis
      labels: {
        show: false // Also hide x-axis labels
      },
      axisTicks: {
        show: false // Hide x-axis ticks
      },
      axisBorder: {
        show: false // Hide x-axis border
      }
    },
    yaxis: {
      show: false // Hide y-axis
    },
    grid: {
      show: false // Hide grid lines
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#FDD835'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      },
    }
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="line" />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default LineChart;