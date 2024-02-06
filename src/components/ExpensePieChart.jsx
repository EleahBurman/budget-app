import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ExpensePieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      series: [],
      options: {
        chart: {
          width: 380,
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
            return opts.w.config.labels[opts.seriesIndex] + " - " + opts.w.globals.series[opts.seriesIndex]
          }
        },
        title: {
          text: 'Expense Distribution'
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        labels: [], // Add this line
      },
    };
  }

  async componentDidMount() {
    if (this.props.expenses instanceof Promise) {
      const expenses = await this.props.expenses;
      this.setState({
        series: expenses.map(expense => expense.amount),
        options: {
          ...this.state.options,
          labels: expenses.map(expense => expense.name), // Add this line
        },
        loading: false,
      });
    } else {
      this.setState({
        series: this.props.expenses.map(expense => expense.amount),
        options: {
          ...this.state.options,
          labels: this.props.expenses.map(expense => expense.name), // Add this line
        },
        loading: false,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expenses !== this.props.expenses) {
      this.setState({
        series: this.props.expenses.map(expense => expense.amount),
        options: {
          ...this.state.options,
          labels: this.props.expenses.map(expense => expense.name), // Add this line
        },
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="donut" width={380} />
      </div>
    );
  }
}

export default ExpensePieChart;