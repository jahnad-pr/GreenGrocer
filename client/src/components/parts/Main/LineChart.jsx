import React, { useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = ({ 
  data = [], 
  viewMode = 'category',
  activeSeries = {
    'Fruits Sales': true,
    'Vegetables Sales': true
  },

}) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [{ name: 'Daily Sales', data: [] }];

    if (viewMode === 'total') {
      // Total sales across all categories
      const processedData = data.map(item => ({
        x: new Date(item.date).getTime(),
        y: item.dailyTotal
      }));

      return [{
        name: 'Total Sales',
        data: processedData
      }];
    } else {
      // Category-based sales
      const fruitsData = data.map(item => ({
        x: new Date(item.date).getTime(),
        y: item.categories.find(cat => cat.categoryName === "Fruits")?.totalAmount || 0
      }));

      const vegetablesData = data.map(item => ({
        x: new Date(item.date).getTime(),
        y: item.categories.find(cat => cat.categoryName === "Vegetables")?.totalAmount || 0
      }));

      return [
        { 
          name: 'Fruits Sales', 
          data: activeSeries['Fruits Sales'] ? fruitsData : [],
          type: 'line'
        },
        { 
          name: 'Vegetables Sales', 
          data: activeSeries['Vegetables Sales'] ? vegetablesData : [],
          type: 'line'
        }
      ];
    }
  }, [data, viewMode, activeSeries]);

  const options = {
    chart: {
      type: 'line',
      height: 380,
      toolbar: {
        show: false
      },
      animations: {
        enabled: true
      }
    },
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeFormatter: {
          year: 'yyyy',
          month: 'MMM',
          day: 'dd'
        },
        style: {
          colors: '#00000060',
          fontSize: '14px'
        },
        formatter: function(value, timestamp) {
          const date = new Date(timestamp);
          return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        }
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#00000060',
          fontSize: '14px'
        },
        formatter: (value) => `₹${value.toFixed(2)}`
      }
    },
    grid: {
      show: false
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: viewMode === 'total' 
          ? ['#22C55E']  // Green for total
          : ['#FF7E5C', '#3549F8'],  // Red for Fruits, Blue for Vegetables
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      }
    },
    tooltip: {
      x: {
        format: 'dd MMM'
      },
      y: {
        formatter: (value) => `₹${value.toFixed(2)}`
      }
    },
    markers: {
      size: 4,
      colors: viewMode === 'total' 
        ? ['#22C55E']  // Green for total
        : ['#FF7E5C', '#3549F8'],  // Red for Fruits, Blue for Vegetables
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 8
      }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      fontSize: '14px',
    
      labels: {
        colors: '#00000060'
      }
    }
  };

  return (
    <div className='rounded-3xl w-full h-[450px] p-4'>
      <div className='w-full h-full -z-10'>
        <ReactApexChart 
          options={options} 
          series={chartData} 
          type="line" 
        height={400}
          width="100%"
        />
      </div>
    </div>
  );
}

export default LineChart;