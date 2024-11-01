import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const MainChart = () => {
  const [downloadFormat, setDownloadFormat] = useState('svg');
  const [startDate, setStartDate] = useState('2018-09-19');
  const [endDate, setEndDate] = useState('2018-09-19');
  const [chartData, setChartData] = useState({
    series: [
      {
        name: '..series1',
        data: [31, 40, 28, 51, 42, 109, 100]
      },
      {
        name: '  ..series2',
        data: [11, 32, 45, 32, 34, 52, 41]
      },
    ],
    options: {
      chart: {
        width: "100%",
        height: "100%",
        type: 'area',
        toolbar: {
          show: false // Hide the toolbar
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0,
          stops: [0, 100, 100]
        }
      },
      colors: ['#FF7E5C', '#3549F8'],
      grid: {
        borderColor: '#90A4AE',
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      xaxis: {
        type: 'datetime',
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ],
        labels: {
          style: {
            colors: '#00000060',
            fontSize: '14px'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#00000060',
            fontSize: '14px'
          }
        }
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        }
      },
      legend: {
        show: false
      }
    }
  });

  const handleApplyFilter = () => {
    console.log('Filtering data between:', startDate, 'and', endDate);
    // Here you would typically filter your data based on the date range
    // Update the chartData state with the filtered data as needed
  };

  const downloadChart = () => {
    const chart = document.querySelector('.apexcharts-canvas');
    
    if (downloadFormat === 'svg' && chart) {
      const svg = chart.getElementsByTagName('svg')[0].outerHTML;
      const data = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'chart-report.svg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (downloadFormat === 'png' && chart) {
      const canvas = document.createElement('canvas');
      const svg = chart.getElementsByTagName('svg')[0].outerHTML;
      const img = new Image();
      const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
      img.onload = function () {
        canvas.width = chart.offsetWidth;
        canvas.height = chart.offsetHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(function (blob) {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'chart-report.png';
          document.body.appendChild(a);
          a.click();
 document.body.removeChild(a);
        });
      };
      img.src = url;
    } else if (downloadFormat === 'jpg') {
      const canvas = document.createElement('canvas');
      const svg = chart.getElementsByTagName('svg')[0].outerHTML;
      const img = new Image();
      const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
      img.onload = function () {
        canvas.width = chart.offsetWidth;
        canvas.height = chart.offsetHeight;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(function (blob) {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'chart-report.jpg';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }, 'image/jpeg', 1.0);
      };
      img.src = url;
    } else if (downloadFormat === 'csv') {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Date, Series1, Series2\n";

      chartData.series[0].data.forEach((value, index) => {
        const date = chartData.options.xaxis.categories[index].split('T')[0];
        csvContent += `${date}, ${value}, ${chartData.series[1].data[index]}\n`;
      });

      const encodedUri = encodeURI(csvContent);
      const a = document.createElement('a');
      a.setAttribute("href", encodedUri);
      a.setAttribute("download", "chart-report.csv");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="w-[100%] translate-y-[-25px]">
      <ReactApexChart 
        options={chartData.options} 
        series={chartData.series} 
        type="area" 
      />
      
      {/* Chart Report  config */}
      <div className="flex items-center space-x-4 mt-5 justify-center mx-auto">

         {/* Date Range Filter */}
      <div className="flex items-center space-x-4 mb-5 justify-center">
        <span className="flex gap-5 items-center bg-gray-200 px-5 py-1 rounded-full">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 rounded cursor-pointer bg-[#ffffff30] outline-none border-none"
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 rounded cursor-pointer bg-[#ffffff30] outline-none border-none"
          />
          <button
            onClick={handleApplyFilter}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            Apply
          </button>
        </span>
      </div>

        {/* downloader */}
        <span className="flex gap-5 items-center mb-5 bg-gray-200 px-5  rounded-full">
          
          <select 
            value={downloadFormat} 
            onChange={(e) => setDownloadFormat(e.target.value)} 
            className="p-2 border rounded cursor-pointer bg-[#ffffff30] outline-none border-none custom-selecter"
          >
            <option value="svg">SVG</option>
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="csv">CSV</option>
          </select>
          <i className="ri-download-fill text-[22px]"></i>
        </span>
      </div>
    </div>
  );
};

export default MainChart;