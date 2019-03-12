import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

class Chart extends React.Component {
    constructor(props){
        super(props);
        if (this.props.projection) {
          let { yearToRetire, income, savingRate, employerMatch, currentSavings } = this.props.projection;
          this.state = {
              yearToRetire,
              income,
              savingRate,
              employerMatch,
              currentSavings,
              estimatedRateOfReturn: 0.08,
              currentYear: new Date().getFullYear(),
              opacity: {
                  savings: 1,
                  savings2: 1,
                  savings3: 1,
              },
              chartData: [],
            };
        } else {
          this.state = {
              yearToRetire: (new Date().getFullYear() + 30),
              income: 20000,
              savingRate: .01,
              employerMatch: 0,
              currentSavings: 10000,
              estimatedRateOfReturn: 0.08,
              currentYear: new Date().getFullYear(),
            opacity: {
              savings: 1,
              savings2: 1,
              savings3: 1,
            },
            chartData: [],
          }
        }
        this.clearChart = this.clearChart.bind(this);
    }

    componentDidMount() {
      this.calculationFormula();
      // if ( this.state.yearToRetire && this.state.income && this.state.savingRate && this.state.employerMatch && this.state.currentSavings){
      // } else {
      //   this.props.history.push("/info");
      // }
    }

    calculateYearReturn(principal,monthlyContribution,rateOfReturn, monthsLeft, contributionLeft){
      if (monthsLeft === 1){
        let total = (principal + (principal * rateOfReturn/12) + monthlyContribution + (monthlyContribution * rateOfReturn/12));
        return total;
      } else {
        let newPrincipal = (principal + (principal * rateOfReturn/12) + monthlyContribution + (monthlyContribution * rateOfReturn/12));
        let contributionRemaining = contributionLeft-monthlyContribution;
        contributionRemaining = contributionRemaining < 0 ? 0 : contributionRemaining;
        return this.calculateYearReturn(newPrincipal, monthlyContribution, rateOfReturn, monthsLeft-1, contributionRemaining);
      }
    }

    calculationFormula() {
      let monthlyContribution = (this.state.income * this.state.savingRate / 12);
      let employerMatch = (this.state.income * this.state.employerMatch / 12);
      let chartData = [];
      let principalWithoutMatch = parseInt(this.state.currentSavings);
      let principalWithMatch = parseInt(this.state.currentSavings);
      let principalWithoutContribution = parseInt(this.state.currentSavings);
      for ( let i = this.state.currentYear; i <= this.state.yearToRetire; i++ ) {
        principalWithoutMatch = this.calculateYearReturn( principalWithoutMatch, monthlyContribution, this.state.estimatedRateOfReturn, 12, 19000);
        principalWithoutContribution = this.calculateYearReturn( principalWithoutContribution, 0, this.state.estimatedRateOfReturn, 12, 19000);
        principalWithMatch = this.calculateYearReturn( principalWithMatch, (monthlyContribution +  employerMatch), this.state.estimatedRateOfReturn, 12, 19000);
        chartData.push( {  name: i, "line1": principalWithoutMatch, "line2": (principalWithMatch), "line3": (principalWithoutContribution) } );
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
          this.setState({ [field]: e.currentTarget.value });
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


    render() {
      document.title = "Projection | Flex Invest"
        const { opacity } = this.state;
        
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        })

        const toDollars = function(input) {
          
          return `${formatter.format(input).replace(/\D00$/, '')}`;
        }
        const CustomTooltip = ({ active, payload, label }) => {
          if (active) {
            return (
              <div className="custom-tooltip">
                <p className="label">{`With Match : ${formatter.format(payload[0].value)}`}</p>
                <p className="label">{`Without Match : ${formatter.format(payload[1].value)}`}</p>
                <p className="label">{`Without no monthly contribution : ${formatter.format(payload[2].value)}`}</p>
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
                    name="Saving Rate with Match"
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
                    name="Saving Rate with Match"
                    dataKey="line1"
                    strokeOpacity={opacity.savings2}
                    dot={false}
                    animationBegin={0}
                    animationDuration={500}
                    activeDot={{ r: 1 }}
                    stroke="#4483EF"
                  />
                <Line 
                    legendType="square"
                    type="monotone"
                    name="Saving Rate with no monthly contribution"
                    dataKey="line3"
                    strokeOpacity={opacity.savings3}
                    dot={false}
                    animationBegin={0}
                    animationDuration={500}
                    activeDot={{ r: 1 }}
                    stroke="#400000"
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
                    0% <input type="range" min={.0} max={.15} step=".01" value={this.state.employerMatch} className="slider" onChange={ this.handleInput("employerMatch") }/> 15%
                    <br/>
                    <br/>
                    Estimated Yearly Market Return ({Math.floor(this.state.estimatedRateOfReturn*100)}%): 
                    <br/>
                    0% <input type="range" min={0.00} max={.5} step=".01" value={this.state.estimatedRateOfReturn} className="slider" onChange={ this.handleInput("estimatedRateOfReturn") }/> 50%
                    <br/>
                    <br/>
                    Current Savings ({ toDollars(Math.floor(this.state.currentSavings))}): 
                    <br/>
                    {toDollars(0)} <input type="range" min={0} max={1000000} step="5000" value={this.state.currentSavings} className="slider" onChange={ this.handleInput("currentSavings") }/> {toDollars(1000000)}
                  </div>
                </div>
        </div>
        )

      }

}

export default Chart;
