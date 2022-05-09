import React, { Component } from 'react'
import SidebarTemplate from '../common/SidebarTemplate/SidebarTemplate';
// import AreaChart from '../Charts/AreaChart';
// import ColumnChart from '../Charts/ColumnChart';
// import LineChart from '../Charts/LineChart';
import './Dashboard.css';
// import PieChart from '../Charts/PieChart';

class Dashboard extends Component {
    render() {
        return (
            <SidebarTemplate>
                <div className="row justify-content-around mb-5">
                     <div className="col-md-5 mt-3">
                        <div className="info-show">
                        <h6>Total Users</h6>
                            <span>
                                13
                            </span>
                        </div>
                    </div>
                    <div className="col-md-5 mt-3">
                    <div className="info-show">
                        <h6>No of Auctions</h6>
                            <span>
                                17
                            </span>
                        </div>
                    </div>
                    {/* <div className="col-md-5 mt-3">
                        <ColumnChart />
                    </div>
                    <div className="col-md-5 mt-3">
                        <AreaChart />
                    </div>
                    <div className="col-md-5 mt-3">
                        <LineChart />
                    </div>
                    <div className="col-md-5 mt-3">
                    </div> */}
                </div>
                
            </SidebarTemplate>
        );
    }
}

export default Dashboard;