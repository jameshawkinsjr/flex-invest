import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

class Chart extends React.Component {
    constructor(props){
        super(props);
        let { yearToRetire, income, savingRate, employerMatch, currentSavings } = this.props.projection
        this.state = {
            yearToRetire,
            income,
            savingRate,
            employerMatch,
            currentSavings,
            today: Date.now(),
            opacity: {
                savings: 1,
                savings2: 1,
              },
          };
    }
    

    handleMouseEnter = (o) => {
        const { dataKey } = o;
        const { opacity } = this.state;
    
        this.setState({
          opacity: { ...opacity, [dataKey]: 0.2 },
        });
      }

      handleInput() {
        return (e) => {
            this.setState({ savingRate: e.target.value });
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
        const { opacity } = this.state;

        const getIntroOfPage = (label) => {
          if (label === 'Page A') {
            return "Page A is about men's clothing";
          } if (label === 'Page B') {
            return "Page B is about women's dress";
          } if (label === 'Page C') {
            return "Page C is about women's bag";
          } if (label === 'Page D') {
            return 'Page D is about household goods';
          } if (label === 'Page E') {
            return 'Page E is about food';
          } if (label === 'Page F') {
            return 'Page F is about baby food';
          }
        };
        
        
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          decimals: 0,
        });

        const toDollars = function(input) {
          
          return `${formatter.format(input/1000)}`;
        }
        const CustomTooltip = ({ active, payload, label }) => {
          if (active) {
            return (
              <div className="custom-tooltip">
                <p className="label">{`${label} : ${formatter.format(payload[0].value)}`}</p>
                <p className="label">{`${label} : ${formatter.format(payload[0].value)}`}</p>
                {/* <p className="intro">{getIntroOfPage(label)}</p> */}
                {/* <p className="desc">Anything you want can be displayed here.</p> */}
              </div>
            );
          }
        
          return null;
        };

        let data = [
            { name : '2019' ,  "line1" : 100000, "line2" : 110000 } , 
            { name : '2020' ,  "line1" : 120000, "line2" : (120000 ** (this.state.savingRate)) } , 
            { name : '2021' ,  "line1" : 140000, "line2" : (140000 ** (this.state.savingRate)) } , 
            { name : '2022' ,  "line1" : 180000, "line2" : (180000 ** (this.state.savingRate)) } , 
            { name : '2023' ,  "line1" : 260000, "line2" : (260000 ** (this.state.savingRate)) } , 
            { name : '2024' ,  "line1" : 460000, "line2" : (460000 ** (this.state.savingRate)) } , 
            { name : '2025' ,  "line1" : 890000, "line2" : (890000 ** (this.state.savingRate)) } , 
            { name : '2026' ,  "line1" : 1100000, "line2" : (1100000 ** (this.state.savingRate)) } , 
            { name : '2027' ,  "line1" : 2300000, "line2" : (2300000 ** (this.state.savingRate)) } , 
            { name : '2028' ,  "line1" : 4000000, "line2" : (4000000 ** (this.state.savingRate)) } , 
            { name : '2029' ,  "line1" : 7800000, "line2" : (7800000 ** (this.state.savingRate)) } , 
            { name : '2030' ,  "line1" : 12000000, "line2" : (12000000 ** (this.state.savingRate)) } , 
            { name : '2031' ,  "line1" : 12000000, "line2" : (12200000 ** (this.state.savingRate)) } , 
            { name : '2032' ,  "line1" : 12000000, "line2" : (12400000 ** (this.state.savingRate)) } , 
            { name : '2033' ,  "line1" : 12000000, "line2" : (12800000 ** (this.state.savingRate)) } , 
            { name : '2034' ,  "line1" : 12000000, "line2" : (13200000 ** (this.state.savingRate)) } , 
            { name : '2035' ,  "line1" : 12000000, "line2" : (13800000 ** (this.state.savingRate)) } , 
            { name : '2036' ,  "line1" : 12000000, "line2" : (14800000 ** (this.state.savingRate)) } , 
            { name : '2037' ,  "line1" : 12000000, "line2" : (15800000 ** (this.state.savingRate)) } , 
            { name : '2038' ,  "line1" : 12000000, "line2" : (17900000 ** (this.state.savingRate)) } , 
            { name : '2039' ,  "line1" : 12000000, "line2" : (20000000 ** (this.state.savingRate)) } , 
            { name : '2040' ,  "line1" : 12000000, "line2" : (22000000 ** (this.state.savingRate)) } , 
            { name : '2041' ,  "line1" : 12000000, "line2" : (24000000 ** (this.state.savingRate)) } , 
            { name : '2042' ,  "line1" : 12000000, "line2" : (28000000 ** (this.state.savingRate)) } , 
            { name : '2043' ,  "line1" : 12000000, "line2" : (36000000 ** (this.state.savingRate)) } , 
        ]

        return (
          <div className="chart-layout flex">
            <div className="chart-container flex-column">
                <LineChart 
                    width={500} height={300} data={data}
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
                    animationDuration={1500}
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
                    animationBegin={1000}
                    animationDuration={1500}
                    activeDot={{ r: 1 }}
                    stroke="#4483EF"
                  />
                </LineChart>
            </div>
            <div>
                  <div className="chart-inputs">
                    {/* Saving Rate: <input type="text" onChange={ this.handleInput() } value={this.state.savingRate}/> */}
                    Saving Rate: <input type="range" min={1.01} max={1.09} step=".01" value={this.state.savingRate} className="slider" onChange={ this.handleInput() }/>
                    Retirement Year: <input type="range" min={1.01} max={1.09} step=".01" value={this.state.savingRate} className="slider" onChange={ this.handleInput() }/>
                    Income: <input type="range" min={1.01} max={1.09} step=".01" value={this.state.savingRate} className="slider" onChange={ this.handleInput() }/>
                    Employer Match: <input type="range" min={1.01} max={1.09} step=".01" value={this.state.savingRate} className="slider" onChange={ this.handleInput() }/>
                  </div>
                </div>
        </div>
        )

      }

}

export default Chart;
