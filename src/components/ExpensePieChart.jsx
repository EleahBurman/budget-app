import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ExpensePieChart = ({ expenses: expensesProp }) => {
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      width: 200,
      type: 'donut',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      }
    },
    dataLabels: {
      enabled: true,
    },
    fill: {
      type: 'gradient',
    },
    legend: {
      formatter: function(val, opts) {
        return opts.w.config.labels[opts.seriesIndex]
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        },
      }
    }],
    labels: [],
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      let expenses = expensesProp;
      if (expensesProp instanceof Promise) {
        expenses = await expensesProp;
      }
      setSeries(expenses.map(expense => expense.amount));
      setOptions(prevOptions => ({
        ...prevOptions,
        labels: expenses.map(expense => expense.name),
      }));
      setLoading(false);
    };

    fetchExpenses();
  }, [expensesProp]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="donut" width={380} style={{marginLeft: '10%'}}/>
    </div>
  );
};

export default ExpensePieChart;