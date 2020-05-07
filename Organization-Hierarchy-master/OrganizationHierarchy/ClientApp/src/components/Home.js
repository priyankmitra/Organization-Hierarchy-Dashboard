import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Button, Header, Image, Modal, Icon, Card , Segment} from 'semantic-ui-react';
import "./Home.css";

import { AddButton } from './AddButton';
import { EditForm } from './EditForm';
import PostCardModal from './PostCardModal';
//import DisplayChart from './DisplayChart';



require('highcharts/modules/sankey')(Highcharts);
require('highcharts/modules/organization')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/accessibility')(Highcharts);

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
        /*linkRadius: 0,
        linkLineWidth: 2,*/
        keys: ['from', 'to'],
        data: [["NAV", "Sudha Gupta"],
            ["NAV", "Nav Gupta"]],
        nodes: [{ "id": "NAV", "name": "NAV" }, { "id": "Sudha Gupta", "name": "Sudha Gupta","title":"CTO" }, {"id":"Nav Gupta","name":"Nav Gupta","title":"CEO"}],
        colorByPoint: false,
        color: '#007ad0',
        dataLabels: {
            color: 'white'
        },
        borderColor: 'white',
        nodeWidth: 80
    }],
    tooltip:
    {
        outside: true
    },
    exporting:
    {
        allowHTML: true,
        sourceWidth: 800,
        sourceHeight: 600
    }

}

let editSearchOptions = false;

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
    
}

function DisplayChart(props) {
    console.log(props);
    return (

        <figure className="highcharts-figure">
            <div id="container">
                <HighchartsReact highcharts={Highcharts} options={props.stateOptions} />
            </div>
        </figure>
    );
}

export class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            relation: [], userNodes: [], stateOptions: {}, isUserRgistered: this.props.isUserRegistered,showPopup: false,
            employeeId: "", image: "", name: "", email: "", designation: "", department: "", office: "", 
            loading : true
            
        }
        Popup = Popup.bind(this);
        this.setSearchOptions = this.setSearchOptions.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.setEditSearchOptionsTrue = this.setEditSearchOptionsTrue.bind(this);
    }

    componentDidMount() {
        this.populateRegisteredUserData();
    }
    
    setSearchOptions() {
        var i;
        const query = this.props.searchedQuery;
        /*console.log("query change to "+query);*/
        for (i = 0; i < (searchedOptions.series[0]).nodes.length; i++) {
            if (((searchedOptions.series[0].nodes[i]).name).toLowerCase().includes(query)) {
                (searchedOptions.series[0].nodes[i]).color = "yellow";
                console.log("query found successfull");
            }
            else if ((searchedOptions.series[0].nodes[i]).employeeUsername === this.props.username) {
                (searchedOptions.series[0].nodes[i]).color = "green";
                
            }
            else if ((searchedOptions.series[0].nodes[i]).userRegisteredOrNot === 0) {
                (searchedOptions.series[0].nodes[i]).color = "red";
            }
            else {
                (searchedOptions.series[0].nodes[i]).color = "#003399";
            }
        }
       //this.setEditSearchOptionsTrue();
    }

    handleClose() {
        this.setState({ showPopup: false })
    }

    setEditSearchOptionsTrue() {
        editSearchOptions=true;
    }
    setEditSearchOptionsFalse() {
        editSearchOptions=false;
    }


    render() {
      //  this.setEditSearchOptionsFalse();
        console.log("Being rendered");
        console.log(this.props);
        

        const query = this.props.searchedQuery;
        

       /* if (this.state.loading === true) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
            );
        }
        else {
            console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
            console.log();
            return (
                <div>
                    Hello
                </div>
            );

        }*/
        


        if (this.state.loading === true) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
            );
        }
        else
        {
            if (query !== "") {

               
                this.setSearchOptions();
                //if (editSearchOptions === true) {
                    return (
                        <div>
                            {/*                            {console.log("Inside query ")}
                            {
                                console.log((searchedOptions.series[0]).nodes)
                            }*/}
                            <DisplayChart  stateOptions={searchedOptions} />

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
              //  }
                /*else {
                    return (
                        <div className="ui active inverted dimmer">
                            <div className="ui text loader">Loading</div>
                        </div>
                    );
                }*/
                
            }
            else {
                console.log(this.state.stateOptions);
                return (
                    <div>
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

        const responseForregisteredUserInformation = await fetch('api/registeredUserInformation');
        const data = await responseForregisteredUserInformation.json();


        var i;
        for (i = 0; i < data.length; i++) {
            singleRelation = [];
            singleRelation.push(data[i].reportingManagerUsername);
            var employeeUsername = data[i].employeeUsername;
            singleRelation.push(employeeUsername);
            relationTable.push(singleRelation);
        }
       
        var allUsers = [];

        
        for (i = 0; i < data.length; i++) {
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
                singleUser.color = "red";
            }
            allUsers.push(singleUser);
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