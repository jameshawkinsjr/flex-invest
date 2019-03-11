import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

class Chart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            yearToRetire: 2030,
            income: 100000,
            savingRate: 1.05,
            employerMatch: 0.01,
            today: Date.now(),
            opacity: {
                savings: 1,
                savings2: 1,
              },
          };
        //   this.handleChange = this.handleChange.bind(this);
    }
    

    componentDidMount() {
        // this.renderChart();
    }

    handleMouseEnter = (o) => {
        const { dataKey } = o;
        const { opacity } = this.state;
    
        this.setState({
          opacity: { ...opacity, [dataKey]: 0.5 },
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

        let data = [
            { year : '2019' ,  savings : 100000, savings2 : (100000 ** (this.state.savingRate)) } , 
            { year : '2020' ,  savings : 120000, savings2 : (120000 ** (this.state.savingRate)) } , 
            { year : '2021' ,  savings : 140000, savings2 : (140000 ** (this.state.savingRate)) } , 
            { year : '2022' ,  savings : 180000, savings2 : (180000 ** (this.state.savingRate)) } , 
            { year : '2023' ,  savings : 260000, savings2 : (200000 ** (this.state.savingRate)) } , 
            { year : '2024' ,  savings : 460000, savings2 : (220000 ** (this.state.savingRate)) } , 
            { year : '2025' ,  savings : 890000, savings2 : (230000 ** (this.state.savingRate)) } , 
            { year : '2026' ,  savings : 1100000, savings2 : (260000 ** (this.state.savingRate)) } , 
            { year : '2027' ,  savings : 2300000, savings2 : (300000 ** (this.state.savingRate)) } , 
            { year : '2028' ,  savings : 4000000, savings2 : (350000 ** (this.state.savingRate)) } , 
            { year : '2029' ,  savings : 7800000, savings2 : (400000 ** (this.state.savingRate)) } , 
            { year : '2030' ,  savings : 12000000, savings2 : (460000 ** (this.state.savingRate)) } , 
        ]

        return (
        <div>
            <LineChart 
                width={500} height={300} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5, }}
            >
            {/* <CartesianGrid strokeDasharray="3 0" /> */}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />
            <Line type="monotone" dataKey="savings" strokeOpacity={opacity.savings} stroke="red" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="savings2" strokeOpacity={opacity.savings2} stroke="blue" />
            </LineChart>
            <div>
                Saving Rate: <input type="text" onChange={ this.handleInput() } value={this.state.savingRate}/>
                Saving Rate: <input type="range" min={1.01} max={2} step=".1" value={this.state.savingRate} class="slider" onChange={ this.handleInput() }/>
                <br/>Saving Rate: { this.state.savingRate}
                <br/>
                <br/>Savings 1:{ data[0].savings}
                <br/>Savings 2:{ data[0].savings2 }
            </div>
        </div>
        )

      }

}

export default Chart;