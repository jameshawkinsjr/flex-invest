import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

class Chart extends React.Component {
    constructor(props){
        super(props);
        // let { yearToRetire, income, savingRate, employerMatch, currentSavings } = this.props.projection
        this.state = {
            yearToRetire: 2030,
            income: 100000,
            savingRate: 0.08,
            employerMatch: 0.06,
            currentSavings: 10000,
            estimatedRateOfReturn: 0.08,
            currentYear: new Date().getFullYear(),
            opacity: {
                savings: 1,
                savings2: 1,
            },
            chartData: [],
          };
          this.clearChart = this.clearChart.bind(this);
    }

    calculateYearReturn(principal,monthlyContribution,rateOfReturn, monthsLeft){
      if (monthsLeft === 1){
        let total = (principal + (principal * rateOfReturn/12) + monthlyContribution + (monthlyContribution * rateOfReturn/12));
        return total;
      } else {
        let newPrincipal = (principal + (principal * rateOfReturn/12) + monthlyContribution + (monthlyContribution * rateOfReturn/12));
        return this.calculateYearReturn(newPrincipal, monthlyContribution, rateOfReturn, monthsLeft-1);
      }
    }

    calculationFormula() {
      let monthlyContribution = (this.state.income * this.state.savingRate / 12);
      let employerMatch = (this.state.income * this.state.employerMatch / 12);
      let chartData = [];
      let principalWithoutMatch = this.state.currentSavings;
      let principalWithMatch = this.state.currentSavings;
      for ( let i = this.state.currentYear; i <= this.state.yearToRetire; i++ ) {
        principalWithoutMatch = this.calculateYearReturn( principalWithoutMatch, monthlyContribution, this.state.estimatedRateOfReturn, 12);
        principalWithMatch = this.calculateYearReturn( principalWithMatch, (monthlyContribution +  employerMatch), this.state.estimatedRateOfReturn, 12);
        chartData.push( {  name: i, "line1": principalWithoutMatch, "line2": (principalWithMatch) } );
      }
      this.setState({ chartData: chartData});
    }

    clearChart() {
      this.setState( { chartData: [] } );
    }

    handleMouseEnter = (o) => {
        const { dataKey } = o;
        const { opacity } = this.state;
    
        this.setState({
          opacity: { ...opacity, [dataKey]: 0.2 },
        });
      }

      handleInput(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
            this.calculationFormula();
        };

    }
    
    handleMouseLeave = (o) => {
      const { dataKey } = o;
      const { opacity } = this.state;
  
      this.setState({
        opacity: { ...opacity, [dataKey]: 1 },
      });
    }

    componentDidMount() {
      this.calculationFormula();
    }


    render() {
        const { opacity } = this.state;
        
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          decimals: 0,
        });

        const toDollars = function(input) {
          
          return `${formatter.format(input)}`;
        }
        const CustomTooltip = ({ active, payload, label }) => {
          if (active) {
            return (
              <div className="custom-tooltip">
                <p className="label">{`With Match : ${formatter.format(payload[0].value)}`}</p>
                <p className="label">{`Without Match : ${formatter.format(payload[1].value)}`}</p>
              </div>
            );
          }
        
          return null;
        };

        return (
          <div className="chart-layout flex">
            <div className="chart-container flex-column">
                <LineChart 
                    width={500} height={300} data={this.state.chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5, }}
                >
                <XAxis dataKey="name" />
                <YAxis tickFormatter={toDollars} />
                <Tooltip content={<CustomTooltip />} />
                <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />
                <Line 
                    legendType="square"
                    type="monotone"
                    name="Saving Rate with Match - Line 2"
                    dataKey="line2"
                    strokeOpacity={opacity.savings}
                    dot={false} 
                    activeDot={{ r: 1 }} 
                    animationBegin={0}
                    animationDuration={500}
                    stroke="#4840BA"
                  />
                {/* <Line type="monotone" dataKey="Savings" strokeOpacity={opacity.savings} stroke="#4840BA" activeDot={{ r: 1 }} /> */}
                <Line 
                    legendType="square"
                    type="monotone"
                    name="Saving Rate with Match - Line 1"
                    dataKey="line1"
                    strokeOpacity={opacity.savings2}
                    dot={false}
                    animationBegin={0}
                    animationDuration={500}
                    activeDot={{ r: 1 }}
                    stroke="#4483EF"
                  />
                </LineChart>
            </div>
            <div>
                  <div className="chart-inputs">
                    {/* Saving Rate: <input type="text" onChange={ this.handleInput() } value={this.state.savingRate}/> */}
                    Saving Rate ({Math.floor(this.state.savingRate * 100)}%): 
                    <br/>
                    1% <input type="range" min={0.01} max={1} step=".01" value={this.state.savingRate} className="slider" onChange={ this.handleInput("savingRate") }/> 100%
                    <br/>
                    <br/>
                    Retirement Year ({Math.floor(this.state.yearToRetire)}): 
                    <br/>
                    {this.state.currentYear} <input type="range" min={this.state.currentYear} max={this.state.currentYear + 60} step="1" value={this.state.yearToRetire} className="slider" onChange={ this.handleInput("yearToRetire") }/> {this.state.currentYear + 60}
                    <br/>
                    <br/>
                    Annual Income ({toDollars(Math.floor(this.state.income))}):
                    <br/>
                    {toDollars(0)}<input type="range" min={0} max={1000000} step="10000" value={this.state.income} className="slider" onChange={ this.handleInput("income") }/>{toDollars(1000000)}
                    <br/>
                    <br/>
                    Employer Match ({Math.floor(this.state.employerMatch*100)}%): 
                    <br/>
                    0% <input type="range" min={.0} max={.1} step=".01" value={this.state.employerMatch} className="slider" onChange={ this.handleInput("employerMatch") }/> 100%
                    <br/>
                    <br/>
                    Estimated Yearly Market Return ({Math.floor(this.state.estimatedRateOfReturn*100)}%): 
                    <br/>
                    0% <input type="range" min={0.00} max={.5} step=".01" value={this.state.estimatedRateOfReturn} className="slider" onChange={ this.handleInput("estimatedRateOfReturn") }/> 50%
                    <br/>
                    <br/>
                    Current Savings ({ toDollars(Math.floor(this.state.currentSavings))}): 
                    <br/>
                    {toDollars(0)} <input type="range" min={0} max={10000000} step="1" value={this.state.currentSavings} className="slider" onChange={ this.handleInput("currentSavings") }/> {toDollars(1000000)}
                  </div>
                </div>
        </div>
        )

      }

}

export default Chart;
