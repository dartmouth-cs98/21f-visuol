//Credit to https://recharts.org/en-US/examples/TwoSimplePieChart
import React, { Component } from 'react';
import { PieChart, Pie, 
        BarChart, Bar, 
        XAxis, 
        YAxis, CartesianGrid, 
        Tooltip, Legend } from "recharts";

export class CompBreakdown extends Component {

    render() {
        return (
            <PieChart width={600} height={600}>
                <Pie 
                    data = {this.props.data}
                    datakey="value"
                    cx = {200}
                    cy = {200}
                    outerRadius={60}
                    fill="#8884d8"
                    label
                />
            </PieChart>
        );
    }
};

export class MonthlyComp extends Component {

    render(){
        return(
            <BarChart
              width={500}
              height={300}
              data={this.props.barData}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="base" stackId="a" fill="#8884d8" />
              <Bar dataKey="bonus" stackId="a" fill="#82ca9d" />
              <Bar dataKey="rsu" stackId="a" fill="#ba296a" />
            </BarChart>
        )
    }

}


