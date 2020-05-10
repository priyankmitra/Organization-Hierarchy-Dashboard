import React, { Component } from 'react';
import "./Home.css";
import PostCardModal from './PostCardModal';
import DisplayChart from './DisplayChart';
import equal from 'fast-deep-equal'

let searchedOptions = {

}


const constOptions = {

    chart: {
        height: 600,
        inverted: true
    },

    title: {
        text: ""
    },

    accessibility: {
        point: {
            descriptionFormatter: function (point) {
                var nodeName = point.toNode.name,
                    nodeId = point.toNode.id,
                    nodeDesc = nodeName === nodeId ? nodeName : nodeName + ', ' + nodeId,
                    parentDesc = point.fromNode.id;
                return point.index + '. ' + nodeDesc + ', reports to ' + parentDesc + '.';
            }
        }
    },
    plotOptions: {
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function () {
                        Popup(this.options);
                    }
                }
            }
        }
    },
    series: [{
        type: 'organization',
        name: 'Highsoft',
        linkWidth: 5,
        keys: ['from', 'to'],
        data: [],
        nodes: [],
        colorByPoint: false,
        color: '#007ad0',
        dataLabels: {
            color: 'white'
        },
        //borderColor: 'white',
        nodeWidth: 80
    }],
    tooltip:
    {
        outside: true
    },
    exporting:
    {
        allowHTML: true,
        sourceWidth: 1200,
        sourceHeight: 1200
    }

}

function Popup(props) {        
    this.setState({
        showPopup: true,
        image: props.image,
        name: props.name,
        email : props.email,
        designation:props.title,
        department:props.description,
        office: props.office
    })
    console.log(this.state.showPopup);
}


export class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            relation: [], userNodes: [], stateOptions: {}, isUserRgistered: this.props.isUserRegistered,showPopup: false,
            employeeId: "", image: "", name: "", email: "", designation: "", department: "", office: "", 
            loading : true, chartType:props.chartType
            
        }
        Popup = Popup.bind(this);
        this.setSearchOptions = this.setSearchOptions.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.populateRegisteredUserData();
    }


    componentDidUpdate(prevProps)
    {
        if (!equal(this.props.chartType, prevProps.chartType) )
        {
            this.populateRegisteredUserData();
        }
        if (!equal(this.props.updateChart, prevProps.updateChart)) {
            this.populateRegisteredUserData();
        }
    }

    
    setSearchOptions() {
        var i;
        const query = this.props.searchedQuery;
        for (i = 0; i < (this.state.stateOptions.series[0]).nodes.length; i++) {
            if (((this.state.stateOptions.series[0].nodes[i]).name).toLowerCase().includes(query) && (query !== "")) {
                
                (this.state.stateOptions.series[0].nodes[i]).borderWidth = "10";
                (this.state.stateOptions.series[0].nodes[i]).borderColor = "red";
            }
            else if ((this.state.stateOptions.series[0].nodes[i]).employeeUsername === this.props.username) {
                (this.state.stateOptions.series[0].nodes[i]).color = "#45dfb1";
                (this.state.stateOptions.series[0].nodes[i]).borderColor = "white";
            }
            else if ((this.state.stateOptions.series[0].nodes[i]).userRegisteredOrNot === 0) {
                (this.state.stateOptions.series[0].nodes[i]).color = "#ceccc4";
                (this.state.stateOptions.series[0].nodes[i]).borderColor = "white";
            }
            else {
                (this.state.stateOptions.series[0].nodes[i]).color = "#0bc5e3";
                (this.state.stateOptions.series[0].nodes[i]).borderColor = "white";
            }
        }
    }

    handleClose() {
        this.setState({ showPopup: false })
    }

    render()
    {
        console.log(this.props)
        const query = this.props.searchedQuery;

        if (this.state.loading === true) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
            );
        }
        else
        {
            if (query !== "")
            {
                this.setSearchOptions();
                return (
                    <div style={{ backgroundColor: 'grey' }}>
                            <DisplayChart stateOptions={this.state.stateOptions} />
                            <PostCardModal
                                modalOpen={this.state.showPopup}
                            handleClose={
                                () => {
                                    this.componentDidMount();
                                        this.setState({ showPopup: false })
                                    }
                                }
                                
                                image={this.state.image}
                                name={this.state.name}
                                email={this.state.email}
                                designation={this.state.designation}
                                department={this.state.department}
                                office={this.state.office}
                                reportingManager={this.state.reportingManager}
                                image={this.state.image}
                            />
                        </div>
                    );
            }
            else {
              //  console.log(this.state.stateOptions);
                this.setSearchOptions();
                return (
                  
                    <div style={{ backgroundColor: 'grey' }} >
                        <DisplayChart stateOptions={this.state.stateOptions} />
                        <PostCardModal
                            modalOpen={this.state.showPopup}
                            handleClose={
                                () => {
                                    this.setState({ showPopup: false })
                                }
                            }
                            image={this.state.image}
                            name={this.state.name}
                            email={this.state.email}
                            designation={this.state.designation}
                            department={this.state.department}
                            office={this.state.office}
                            reportingManager={this.state.reportingManager}
                            image={this.state.image}
                        />
                    </div>
                );
            }
        }
    }

    async populateRegisteredUserData() {
        var relationTable = [];
        var singleRelation = [];
        var username = this.props.username;
        var chartType = this.props.chartType;
        const responseForregisteredUserInformation = await fetch('api/registeredUserInformation?value=0');
        const data = await responseForregisteredUserInformation.json();


        var i;
        for (i = 0; i < data.length; i++) {
            if (data[i].departmentName === chartType)
            {
                singleRelation = [];
                singleRelation.push(data[i].reportingManagerUsername);
                var employeeUsername = data[i].employeeUsername;
                singleRelation.push(employeeUsername);
                relationTable.push(singleRelation);
            }
        }
        var allUsers = [];

        
        for (i = 0; i < data.length; i++) {
            if (data[i].departmentName === chartType)
            {
                var singleUser = {};
                if (data[i].userRegisteredOrNot === 1) {
                    singleUser.id = data[i].employeeUsername;
                    singleUser.name = data[i].displayName;
                    singleUser.title = data[i].designation;
                    singleUser.description = data[i].departmentName;
                    singleUser.email = data[i].email;
                    singleUser.office = data[i].office;
                    singleUser.image = data[i].profilepicPath;
                    singleUser.reportingManager = data[i].reportingManagerUsername;
                    singleUser.employeeUsername = data[i].employeeUsername;
                    singleUser.userRegisteredOrNot = data[i].userRegisteredOrNot;
                }
                else {
                    singleUser.id = data[i].employeeUsername;
                    singleUser.name = data[i].employeeUsername;
                    singleUser.employeeUsername = data[i].employeeUsername;
                    singleUser.userRegisteredOrNot = data[i].userRegisteredOrNot;
                    singleUser.description = "User is not Registered!";

                }

                if (data[i].employeeUsername === username) {
                    singleUser.color = "green";
                }
                else if (data[i].userRegisteredOrNot === 1) {
                    singleUser.color = "#003399";
                }
                else {
                    singleUser.color = "silver";
                }
               // singleUser.borderRadius = 25;
                
                allUsers.push(singleUser);
            }
        }
       
        constOptions.series[0].data = relationTable;
        constOptions.series[0].nodes = allUsers;
        var nav = {};
        nav.id = "NAV";
        nav.name = "NAV"
        nav.color = "silver";
        nav.employeeUsername = "NAV";
        nav.userRegisteredOrNot = 2;
        constOptions.series[0].nodes.push(nav);

        searchedOptions = JSON.parse(JSON.stringify(constOptions));

        this.setState({ relation: relationTable, userNodes: allUsers, stateOptions: constOptions, loading:false});
        
    }

}