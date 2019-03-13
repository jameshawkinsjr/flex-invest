import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, AreaChart, Area} from 'recharts';
import { Link } from 'react-router-dom';

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
              chartData: [],
              principalChartData: [],
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
              chartData: [],
              principalChartData: [],
          }
        }
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
      let principalChartData = [];
      let principalWithoutMatch = parseInt(this.state.currentSavings);
      let principalWithMatch = parseInt(this.state.currentSavings);
      let principalWithoutContribution = parseInt(this.state.currentSavings);
      let principalNoMarket = parseInt(this.state.currentSavings);
      let principalWithMarket = parseInt(this.state.currentSavings);
      for ( let i = this.state.currentYear; i <= this.state.yearToRetire; i++ ) {
        principalWithoutMatch = this.calculateYearReturn( principalWithoutMatch, monthlyContribution, this.state.estimatedRateOfReturn, 12, 19000);
        principalWithoutContribution = this.calculateYearReturn( principalWithoutContribution, 0, this.state.estimatedRateOfReturn, 12, 19000);
        principalWithMatch = this.calculateYearReturn( principalWithMatch, (monthlyContribution +  employerMatch), this.state.estimatedRateOfReturn, 12, 19000);
        chartData = [...chartData, {  name: i, "line1": principalWithoutMatch, "line2": (principalWithMatch), "line3": (principalWithoutContribution) }];
        principalNoMarket = this.calculateYearReturn( principalWithMatch, (monthlyContribution +  employerMatch), this.state.estimatedRateOfReturn, 12, 19000);
        principalWithMarket = this.calculateYearReturn( principalWithMatch, (monthlyContribution +  employerMatch), 0, 12, 19000);
        principalChartData.push( {  name: i, "line1": principalNoMarket, "line2": principalWithMarket} );
        principalChartData = [...principalChartData, {  name: i, "line1": principalNoMarket, "line2": principalWithMarket} ];
      }
      this.setState({ chartData: chartData});
      this.setState({ principalChartData: principalChartData});
    }


      handleNum(field) {
        return (e) => {
          this.setState({ [field]: parseInt(e.currentTarget.value) }, () => {
            this.calculationFormula();
          });
        };
      }
      
      handleFloat(field) {
        return (e) => {
          this.setState({ [field]: parseFloat(e.currentTarget.value) }, () => {
            this.calculationFormula();
          });
        };
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
        const CustomTooltip2 = ({ active, payload, label }) => {
          if (active) {
            return (
              <div className="custom-tooltip">
                <p className="label">{`Interest Earned : ${formatter.format(payload[0].value-payload[1].value)}`}</p>
                <p className="label">{`Principal Investment : ${formatter.format(payload[1].value)}`}</p>

              </div>
            );
          }
        
          return null;
        };

        return (
          <div className="chart-page flex-column">
          <div className="chart-header">Your Future</div>
          <div className="chart-arrows flex"><span role="img" aria-label="arrow-emoji">↙️</span><pre>                  </pre><span role="img" aria-label="arrow-emoji">↘️</span></div>
          <div className="chart-layout flex">
            <div className="chart-1 flex">
              <div className="chart-container flex-column">
              <div className="chart-title">{`401k Interest Accrual & Employer Match calculator`}</div>
                  <LineChart 
                      width={500} height={400} data={this.state.chartData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 20, }}
                  >
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={toDollars} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                      legendType="square"
                      type="monotone"
                      name="with employer match"
                      dataKey="line2"
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
                      name="without employer match"
                      dataKey="line1"
                      dot={false}
                      animationBegin={0}
                      animationDuration={500}
                      activeDot={{ r: 1 }}
                      stroke="#4483EF"
                    />
                  <Line 
                      legendType="square"
                      type="monotone"
                      name="without monthly contributions"
                      dataKey="line3"
                      dot={false}
                      animationBegin={0}
                      animationDuration={500}
                      activeDot={{ r: 1 }}
                      stroke="#400000"
                    />
                  </LineChart>
              </div>
              <div className="chart-container flex-column">
                  <div className="chart-title">{`Input Manipulator`}</div>
                  <div className="chart-inputs">
                    <div className="chart-input flex-column">
                        <div className="chart-slider-title flex"><div className="chart-variable-rate-title">Saving Rate:</div></div>
                        <div className="chart-slider flex"><input type="range" min={0.01} max={1} step=".01" value={this.state.savingRate} className="slider" onChange={ this.handleFloat("savingRate") }/><div className="chart-variable-rate">{Math.floor(this.state.savingRate * 100)}%</div></div>
                    </div>
                    <div className="chart-input flex-column">
                        <div className="chart-slider-title flex"><div className="chart-variable-rate-title">Retirement Year:</div></div>
                        <div className="chart-slider flex"><input type="range" min={this.state.currentYear} max={this.state.currentYear + 60} step="1" value={this.state.yearToRetire} className="slider" onChange={ this.handleNum("yearToRetire") }/><div className="chart-variable-rate">{Math.floor(this.state.yearToRetire)}</div></div>
                    </div>
                    <div className="chart-input flex-column">
                        <div className="chart-slider-title flex"><div className="chart-variable-rate-title">Annual Income</div></div>
                        <div className="chart-slider flex"><input type="range" min={0} max={1000000} step="10000" value={this.state.income} className="slider" onChange={ this.handleNum("income") }/><div className="chart-variable-rate">{toDollars(Math.floor(this.state.income))}</div></div>
                    </div>
                    <div className="chart-input flex-column">
                        <div className="chart-slider-title flex"><div className="chart-variable-rate-title">Employer Match:</div></div>
                        <div className="chart-slider flex"><input type="range" min={.0} max={.15} step=".01" value={this.state.employerMatch} className="slider" onChange={ this.handleFloat("employerMatch") }/><div className="chart-variable-rate">{Math.floor(this.state.employerMatch*100)}%</div></div>
                    </div>
                    <div className="chart-input flex-column">
                        <div className="chart-slider-title flex"><div className="chart-variable-rate-title">Estimated Yearly Return:</div></div>
                        <div className="chart-slider flex"><input type="range" min={0.00} max={.5} step=".01" value={this.state.estimatedRateOfReturn} className="slider" onChange={ this.handleFloat("estimatedRateOfReturn") }/><div className="chart-variable-rate">{Math.floor(this.state.estimatedRateOfReturn*100)}%</div></div>
                    </div>
                    <div className="chart-input flex-column">
                        <div className="chart-slider-title flex"><div className="chart-variable-rate-title">Current Savings:</div></div>
                        <div className="chart-slider flex"><input type="range" min={0} max={5000000} step="1000" value={this.state.currentSavings} className="slider" onChange={ this.handleNum("currentSavings") }/><div className="chart-variable-rate">{ toDollars(Math.floor(this.state.currentSavings))}</div></div>
                    </div>
                  </div>
              </div>
            
        
          <div className="chart-container flex-column">
          <div className="chart-title">{`Projected Market Rate of Returns`}</div>
          <AreaChart 
                width={500}
                height={400}
                data={this.state.principalChartData} 
                margin={{ top: 5, right: 30, left: 20, bottom: 20, }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={toDollars} />
              <Tooltip content={<CustomTooltip2 />} />
              <Area 
                  legendType="square"
                  type="monotone" 
                  name="Interest Earned"
                  dataKey="line1" 
                  stroke="#82119e" 
                  fill="#82119e" 
                  animationBegin={0}
                  animationDuration={500}
              />
              <Area 
                  legendType="square"
                  type="monotone" 
                  name="Principal Investment"
                  dataKey="line2" 
                  stroke="#450953"
                  fill="#450953" 
                  animationBegin={0}
                  animationDuration={500}
              />



              <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />
          </AreaChart>
          </div>
          </div>
      </div>
        <Link className="fund-page" to={'/funds'}> <span role="img" aria-label="forward-arrow-emoji">️➡️</span> Let's get started ️️️<span role="img" aria-label="forward-arrow-emoji">️➡️</span></Link>
      </div>
        )

      }

}

export default Chart;
