import {CompBreakdown, MonthlyComp} from "./CompBreakdown";
import {mock} from "./MockData";
import React, { Component } from 'react';
import './LoadGraphs.css'

const LoadData = () => {
    let data1 = [
        {name: "base", value : mock.base},
        {name: "bonus", value : mock.bonus},
        {name: "rsu", value : mock.rsu}
    ]
    let data2 = [
        {month: 'Januray', base: mock.base/12, bonus: mock.bonus/12, rsu: mock.rsu/12},
        {month: 'Feburary', base: mock.base/12, bonus: mock.bonus/12, rsu: mock.rsu/12},
        {month: 'March', base: mock.base/12, bonus: mock.bonus/12, rsu: mock.rsu/12}
    ]
    return [data1, data2];
};

class LoadGraphs extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
          data : LoadData()
        }
    }
    render() {
        const job = `${mock.company}, ${mock.role}`;
        return(
            <div>
                <div className="Role">{job}</div>
                <div className="Graphs">
                    <CompBreakdown data={this.state.data[0]}/>
                    <MonthlyComp barData={this.state.data[1]}/>
                </div>
            </div>
            
        );

    }
}

export default LoadGraphs;