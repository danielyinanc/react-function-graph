import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import math from 'mathjs';
import './index.css'
import _ from 'underscore';
import { Grid, Row, Col } from 'react-flexbox-grid';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      function: '',
      rangeMin: -10,
      rangeMax: 10
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    Chart.pluginService.register({
        beforeInit: function(chart) {
            var data = chart.config.data;
            for (var i = 0; i < data.datasets.length; i++) {
                for (var j = 0; j < data.labels.length; j++) {
                  var fct = data.datasets[i].function,
                      x = data.labels[j],
                      y = fct(x);
                    data.datasets[i].data.push(y);
                }
            }
        }
    });
  }

   handleChange (name, e) {
      var change = {};
      if(name==='rangeMin' || name==='rangeMax') {
        change[name] = parseInt(e.target.value);  
      } else {
        change[name] = e.target.value;
      }
      
      this.setState(change);
    }

  handleSubmit(event) {
      const that = this;
      console.log(typeof this.state.rangeMin);
      var ctx = document.getElementById("myChart");
      let labels= _.range(this.state.rangeMin, this.state.rangeMax);
      var data = {
      labels: labels,
      datasets: [{
          label: this.state.function,
          function: function(x) {
            var parser = math.parser();
            parser.set('x', x);
            return parser.eval(that.state.function);
          },
          data: [],
          borderColor: "rgba(153, 102, 255, 1)",
          fill: false
      }]  
    }

        new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    event.preventDefault();
  }

  render() {
    return (
      <Grid fluid>
        <Row>


      <form onSubmit={this.handleSubmit}>
        <Col xs={12} sm={3} md={2} lg={1}>
        <label>
          Function:
          <input type="text" value={this.state.function} onChange={this.handleChange.bind(this, 'function')}  />

        </label>
        </Col >
          <Col xs={12} sm={3} md={2} lg={1}>
          <label>
          RangeMin:
          <input type="number" value={this.state.rangeMin} onChange={this.handleChange.bind(this, 'rangeMin')}  />

        </label>
         </Col >
        <Col xs={12} sm={3} md={2} lg={1}>
         <label>
          RangeMax:
          <input type="number" value={this.state.rangeMax} onChange={this.handleChange.bind(this, 'rangeMax')}  />

        </label>
                </Col >

        <Col xs={12} sm={3} md={2} lg={1}>
        <input type="submit" value="Submit" />
                 </Col >
      </form>
      </Row>
      <Row>
      <canvas id="myChart"></canvas>
      </Row>
      </Grid>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);