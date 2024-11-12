import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const [chartData] = React.useState({
    series: [76, 67, 61, 90],
    options: {
      chart: {
        height: 390,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '30%',
            background: 'transparent',
            image: undefined,
          },
          track: {
            background: '#f0f0f0',
            strokeWidth: '100%',
            margin: 5,
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15
            }
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            }
          },
          barLabels: {
            enabled: true,
            useSeriesColors: true,
            offsetX: -8,
            fontSize: '16px',
            formatter: (seriesName, opts) => {
              return seriesName + ": " + opts.w.globals.series[opts.seriesIndex];
            },
          },
          strokeWidth: 12,  // Thickness of the progress bars
          lineCap: 'round',  // Rounded ends
          distributed: true,  // Enable individual styling
          pathRadius: 'smooth',  // Smooth curve
        }
      },
      stroke: {
        lineCap: 'round',
        curve: 'smooth',
      },
      colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
      labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          gradientToColors: ['#21c7fc', '#2196ff', '#4a6ac0', '#1a8fd8'],
          stops: [0, 100]
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            show: false
          }
        }
      }],
      tooltip: {
        enabled: true,
        style: {
          fontSize: '14px'
        },
        y: {
          formatter: (value) => `${value}%`
        }
      },
      states: {
        hover: {
          filter: {
            type: 'lighten',
            value: 0.15,
          }
        },
        active: {
          filter: {
            type: 'darken',
            value: 0.15,
          }
        }
      }
    }
  });

  return (
    <div className="w-full max-w-2xl mx-auto h-full p5 bg-white rounded-lg">
      <div id="chart" className="relative h-full">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="radialBar"
          height={300}
        />
        {/* Custom center dot */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 
                     shadow-lg"
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;