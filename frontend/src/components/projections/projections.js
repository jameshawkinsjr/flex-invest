import React from 'react';
import * as d3 from "d3";

class Projections extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            yearToRetire: 2030,
            income: 100000,
            savingRate: 0.02,
            employerMatch: 0.01,
            today: Date.now()

          };
    }

    componentDidMount() {
        this.renderChart();
    }


    renderChart() {

        let data = [
            { year : '2019' ,  savings : 100000 } , 
            { year : '2020' ,  savings : 110000 } , 
            { year : '2021' ,  savings : 120000 } , 
            { year : '2022' ,  savings : 130000 } , 
            { year : '2023' ,  savings : 140000 } , 
            { year : '2024' ,  savings : 150000 } , 
            { year : '2025' ,  savings : 160000 } , 
            { year : '2026' ,  savings : 170000 } , 
            { year : '2027' ,  savings : 180000 } , 
            { year : '2028' ,  savings : 190000 } , 
            { year : '2029' ,  savings : 200000 } , 
            { year : '2030' ,  savings : 210000 } , 
        ]

        let width = 1000;
        let height = 600;

        var margin = {
        top: 10,
        bottom: 70,
        left: 70,
        right: 20
        };

        var svg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('fill', '#000000')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        var x_scale = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.year; }))
        .rangeRound([0, width]);

        var y_scale = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.savings; }))
        .rangeRound([height, 0]);

        svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')');

        svg.append('g')
        .attr('class', 'y axis');

        var y_axis = d3.axisLeft(y_scale)
            .ticks(10);

        var x_axis = d3.axisBottom(x_scale)
            .ticks(4);


        var colour_scale = d3.scaleQuantile()
        .range(["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"]);

        function update(year) {

            var t = d3.transition()
                .duration(3000);

            var max_value = d3.max(data, function(d) {
                        return d.savings;
                    });

            y_scale.domain([margin.right, max_value]);
            colour_scale.domain([0, max_value]);

            var bars = svg.selectAll('.bar')
                .data(data);
            //exit
            bars
                .exit()
                .remove();

            //enter
            var new_bars = bars
                .enter()
                .append('rect')
                .attr('class', 'bar')
                // .attr('height', 0)
                .attr('y', height)
                .attr('width', width/15);

            new_bars.merge(bars)
                .transition(t)
                .attr('x', function(d) {
                    return x_scale(d.year);
                })
                .attr('y', function(d) {
                    return y_scale(d.savings);
                })
                .attr('height', function(d) {
                    return height - y_scale(d.savings);
                })
                .attr('fill', function(d) {
                    return colour_scale(d.savings);
                });

            svg.select('.x.axis')
                .transition(t)
                .call(x_axis);

            svg.select('.y.axis')
                .transition(t)
                .call(y_axis);
            }
            
        var select = d3.select('#year');
        select.on('change', function() {
        update(this.savings);

        })

        update(data2);

        let data2 = [
            { year : 2019 ,  savings : 100000 } , 
            { year : 2020 ,  savings : 110000 } , 
            { year : 2021 ,  savings : 120000 } , 
            { year : 2022 ,  savings : 130000 } , 
            { year : 2023 ,  savings : 140000 } , 
            { year : 2024 ,  savings : 150000 } , 
            { year : 2025 ,  savings : 160000 } , 
            { year : 2026 ,  savings : 170000 } , 
            { year : 2027 ,  savings : 180000 } , 
            { year : 2028 ,  savings : 190000 } , 
            { year : 2029 ,  savings : 200000 } , 
            { year : 2030 ,  savings : 210000 } , 
        ]

        }

    render() {
        return (
          <div id="chart">
          </div>
        );
      }




}

export default Projections;


