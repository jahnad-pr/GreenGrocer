import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetChartsDetailsMutation } from '../../../services/Admin/adminApi';

const MainChart = ({setIsPopupOpen,
  isPopupOpen }) => {

  const [getChartsDetails, { data }] = useGetChartsDetailsMutation()

  useEffect(()=>{ (()=>{ if(data){ console.log(data) }  })() },[data])

  useEffect(()=>{ (async()=>{ await getChartsDetails(`filterby=salesPeriod&period=custom`).unwrap() })() },[])


  const [downloadFormat, setDownloadFormat] = useState('svg');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedPeriod, setSelectedPeriod] = useState('thisWeek');
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [viewMode, setViewMode] = useState('category'); // 'category' or 'total'
  


  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Fruits',
        data: [0]
      },
      {
        name: 'Vegetables',
        data: [0]
      }
    ],
    options: {
      chart: {
        width: "100%",
        height: "100%",
        type: 'area',
        toolbar: {
          show: false
        },
        padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20
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
        categories: [new Date().toISOString()],
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
          format: 'dd/MM/yy'
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
    }
  });

  const processChartData = (data, mode) => {
    if (!data || data.length === 0) return null;

    const dates = data.map(day => new Date(day.date).getTime());
    let series = [];
    let colors = [];

    if (mode === 'total') {
      const totalData = data.map(day => ({
        x: new Date(day.date).getTime(),
        y: day.categories.reduce((sum, cat) => sum + (cat.totalOrders || 0), 0)
      }));

      series = [{
        name: 'Total Orders',
        data: totalData
      }];
      colors = ['#22C55E']; // Green for total
    } else {
      const fruitsData = data.map(day => ({
        x: new Date(day.date).getTime(),
        y: day.categories.find(cat => cat.categoryName === "Fruits")?.totalOrders || 0
      }));

      const vegetablesData = data.map(day => ({
        x: new Date(day.date).getTime(),
        y: day.categories.find(cat => cat.categoryName === "Vegetables")?.totalOrders || 0
      }));

      series = [
        { name: 'Fruits', data: fruitsData },
        { name: 'Vegetables', data: vegetablesData }
      ];
      colors = ['#FF7E5C', '#3549F8'];
    }

    const allValues = series.flatMap(s => s.data.map(d => d.y));
    const yAxisMax = Math.ceil(Math.max(...allValues) * 1.2);

    return { series, colors, dates, yAxisMax };
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const chartData = processChartData(data, viewMode);
      if (!chartData) return;

      setChartData(prev => ({
        ...prev,
        series: chartData.series,
        options: {
          ...prev.options,
          colors: chartData.colors,
          xaxis: {
            ...prev.options.xaxis,
            categories: chartData.dates,
            type: 'datetime',
            labels: {
              style: { colors: '#00000060', fontSize: '14px' },
              formatter: function(value, timestamp) {
                const date = new Date(timestamp);
                const today = new Date();
                return date.toDateString() === today.toDateString() 
                  ? 'Today'
                  : date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
              }
            }
          },
          yaxis: {
            ...prev.options.yaxis,
            min: 0,
            max: chartData.yAxisMax,
            tickAmount: 5,
            labels: {
              formatter: (value) => Math.round(value),
              style: { colors: '#00000060', fontSize: '14px' }
            }
          }
        }
      }));
    }
  }, [data, viewMode]);

  const periodOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'thisWeek', label: 'This Week' },
    { value: 'lastWeek', label: 'Last Week' },
    { value: 'last7Days', label: 'Last 7 Days' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'last30Days', label: 'Last 30 Days' },
    { value: 'last50Days', label: 'Last 50 Days' },
    { value: 'last100Days', label: 'Last 100 Days' },
    { value: 'thisYear', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handlePeriodChange = async (e) => {
    const period = e.target.value;
    setSelectedPeriod(period);
    
    if (period === 'custom') {
      setShowCustomDate(true);
    } else {
      setShowCustomDate(false);
      // Call API with selected period
      await getChartsDetails(`filterby=salesPeriod&period=${period}`).unwrap();
    }
  };

  const handleCustomDateApply = async () => {
    await getChartsDetails(`filterby=salesPeriod&period=custom&startDate=${startDate}&endDate=${endDate}`).unwrap();
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
      csvContent += "Date,Fruits Orders,Vegetables Orders\n";

      data.forEach(day => {
        const fruitsCategory = day.categories.find(cat => cat.categoryName === "Fruits");
        const vegetablesCategory = day.categories.find(cat => cat.categoryName === "Vegetables");
        
        csvContent += `${day.date},${fruitsCategory ? fruitsCategory.totalOrders : 0},${vegetablesCategory ? vegetablesCategory.totalOrders : 0}\n`;
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
      <span className='flex'>
       {/* downloader */}
     <span className='flex-1'></span>
      <span className="inline-flex gap-5 items-center px-5 rounded-full">
          {/* <select 
            value={downloadFormat} 
            onChange={(e) => setDownloadFormat(e.target.value)} 
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-800"
          >
            <option value="svg">SVG</option>
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="csv">CSV</option>
          </select> */}
          {/* <i className="ri-download-fill text-[22px]"></i> */}
        </span>

        {/* Chart Controls Button */}
        <button 
          onClick={() => setIsPopupOpen(true)}
          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
        >
          <i className="ri-settings-3-line text-[22px]"></i>
        </button>

      </span>
      <ReactApexChart 
        options={chartData.options} 
        series={chartData.series} 
        type="area"
        height={400}
      />

      {/* Chart Controls */}
      <span className='flex items-center space-x-4 justify-center'>
      </span>
      
      {/* Chart Controls Popup */}
    <PopupSelector   isPopupOpen={isPopupOpen} periodOptions={periodOptions} setIsPopupOpen={setIsPopupOpen} selectedPeriod={selectedPeriod} handlePeriodChange={handlePeriodChange} setViewMode={setViewMode} viewMode={viewMode} downloadFormat={downloadFormat} setDownloadFormat={setDownloadFormat} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} handleCustomDateApply={handleCustomDateApply}  />
    </div>
  );
};


function PopupSelector({ isPopupOpen, periodOptions, setIsPopupOpen, selectedPeriod, handlePeriodChange, option, setViewMode, viewMode, downloadFormat, e, setDownloadFormat, startDate, setStartDate, endDate, setEndDate, handleCustomDateApply }) {
  return (
    <>
      <AnimatePresence>
        {isPopupOpen && <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className='fixed top-0 right-0 w-full z-40 flex items-center justify-center overflow-hidden '>
          <motion.div initial={{
            opacity: 0,
            backdropFilter: "blur(0px)"
          }} animate={{
            opacity: 1,
            backdropFilter: "blur(0px)"
          }} exit={{
            opacity: 0,
            backdropFilter: "blur(0px)"
          }} transition={{
            duration: 0.5
          }} className="absolute inset-0" onClick={() => setIsPopupOpen(false)} />

          <motion.div initial={{
            scale: 0.4,
            opacity: 0,
            rotateX: 90,
            y: -60
          }} animate={{
            scale: [0.4, 1.1, 1],
            opacity: 1,
            rotateX: 0,
            y: 0
          }} exit={{
            scale: 0.4,
            opacity: 0,
            rotateX: -90,
            y: 60
          }} transition={{
            type: "spring",
            damping: 15,
            stiffness: 300,
            bounce: 0.4,
            duration: 0.6
          }} style={{
            transformPerspective: 1200,
            transformStyle: "preserve-3d"
          }} className=" backdrop-blur-xl py-10 bg-white/90 flex items-center justify-center flex-col gap-5 rounded-3xl px-10 relative z-50 border border-gray-200">
        
            <motion.div initial={{
              y: 20,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.4
            }} className="w-full flex flex-col gap-4 px-5">

            <i onClick={() => setIsPopupOpen(false)} className="ri-close-circle-line text-[30px] absolute duration-500 top-5 right-5 cursor-pointer"></i>      

              <span className='flex gap-2'>

              {
                /* Period Selector */
              }
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-2">Period</label>
                <select value={selectedPeriod} onChange={handlePeriodChange} className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-800">
                  {periodOptions.map(option => <option key={option.value} value={option.value} className="bg-black text-white">
                    {option.label}
                  </option>)}
                </select>
              </div>

              {
                /* View Mode Toggle */
              }
              <div className="w-1/2 inline">
                <label className="block text-sm font-medium mb-2">View Mode</label>
                <div className="flex space-x-2">
                  <motion.button whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }} onClick={() => setViewMode('category')} className={`flex-1 p-3 rounded-xl transition-all ${viewMode === 'category' ? 'bg-[#22c55e]' : 'border-2 border-[#22c55e]'}`}>
                    Categories
                  </motion.button>
                  <motion.button whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }} onClick={() => setViewMode('total')} className={`flex-1 p-3 rounded-xl transition-all  ${viewMode === 'total' ? 'bg-[#22c55e]' : 'border-2 border-[#22c55e]'}`}>
                    Total
                  </motion.button>
                </div>
              </div>
              </span>

            
              {
                /* Custom Date Range */
              }
              {selectedPeriod === 'custom' &&
              <>
                <label className="block text-sm font-medium leading-none">Custom Date Range</label>
              <div className="w-1/2 flex gap-2">
                <div className="flex space-x-2">
                  <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="flex-1 p-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-800" />
                  <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="flex-1 p-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-800" />
                </div>
              </div>
              </>
              }
            </motion.div>

          
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </>
  )
}


  export default MainChart;