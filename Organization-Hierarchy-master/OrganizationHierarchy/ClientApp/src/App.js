import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { RegistrationForm } from './components/RegistrationForm';
import EditFormModal from './components/EditFormModal';
import { Input, Menu, Dropdown, Search, Button, Image, Modal, Card, Popup, Icon} from 'semantic-ui-react'
import logo from './components/logo.png';
import './custom.css'
import equal from 'fast-deep-equal'

export default class App extends Component {
  static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            isUserRegistered: 2,
            searchedValue: "",
            showEditForm: false,
            DisplayName: "",
            ReportingManagerUserName: "",
            EmployeeUsername: "",
            Email: "",
            image: null,
            DepartmentName: "",
            Designation: "",
            Office: "",
            popupOpen: false,
            chartType: "IT",
            updateChart:1
        }
        this.searchChange = this.searchChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChart = this.handleChart.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    handleChart(event, { value } ) {
        
        this.setState({chartType : value})
    }

    handlePopupOpen = () => {
        this.setState({ popupOpen: true });
    }

    handleSubmit() {
        this.setState({
            popupOpen: false,
            showEditForm: true
        })
    }

    closePopup() {
        this.setState({
            popupOpen: false
        })
    }

    componentDidMount() {
        this.populateUsernaameData();
    }
   

    searchChange(event, { value }) {
            this.setState({ searchedValue: value  })
    }

    render() {
        if (this.state.isUserRegistered === 2) {
            return (
                    <div className="ui active inverted dimmer">
                        <div className="ui text loader">Loading</div>
                    </div>
            );
        }
        else if (this.state.isUserRegistered === 0) {
            return (
                <div>
                    {/*<Layout username={this.state.username} isUserRegistered={this.state.isUserRegistered} />*/}
                    <Menu inverted>
                        <Menu.Item header position='left'>
                            <img src={logo}/>
                            Organization Hierarchy
                            </Menu.Item>
                        <Menu.Item header position='right'>{this.state.username}</Menu.Item>
                    </Menu>
                    <RegistrationForm />
                </div>
            );
        }
        else {
            return (
                <div>
                    <Menu inverted>
                        <Menu.Item header position='left'><img src={logo} /><Popup
                            content={
                                <Card>
                                    <Card.Content>
                                        <Image
                                            floated='left'
                                            size='medium'
                                            src={logo}
                                        />
                                    </Card.Content>
                                </Card>

                            }
                            hoverable={true}
                            pinned
                            basic
                            position='bottom right'
                            eventsEnabled={true}
                            trigger={<img class="ui mini circular image" src={logo} />}

                        />Organization Hierarchy</Menu.Item>
                        
                        <Menu.Item position='middle'>
                            <Dropdown item text='Chart'>
                                <Dropdown.Menu>
                                    <Dropdown.Item value= 'Default' onClick={this.handleChart}>Default</Dropdown.Item>
                                    <Dropdown.Item value='IT' onClick={this.handleChart}>IT</Dropdown.Item>
                                    <Dropdown.Item value='Accounts' onClick={this.handleChart}>Accounts</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                        <Menu.Item position='middle'>
                            <Search
                                showNoResults= {false}
                                onSearchChange={this.searchChange}
                                value={this.state.searchedValue}
                            />
                        </Menu.Item>
                        <Menu.Item header position='right'>{this.state.username}</Menu.Item>
                        <Menu.Item>
                            <Popup
                                content={
                                    <Card>
                                        <Card.Content>
                                            <Image
                                                floated='left'
                                                size='tiny'
                                                src={this.state.image}
                                            />
                                            <Card.Header>
                                                {this.state.DisplayName}
                                            </Card.Header>
                                            <Card.Meta>
                                                {this.state.Designation} , {this.state.DepartmentName}
                                            </Card.Meta>
                                            <Card.Description>
                                                <h7><i class="envelope open icon"></i>{this.state.Email}</h7>
                                                <br />
                                                <h7><i class="phone  icon"></i>1526</h7>
                                                <br />
                                                <h7><i class="building  icon"></i>{this.state.Office}</h7>
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra textAlign="center">
                                            <Button className="ui black basic button" onClick={this.handleSubmit}  > Sync and Edit </Button>
                                            <Button icon onClick={this.closePopup} ><Icon name='close' /></Button>
                                        </Card.Content>
                                    </Card>

                                }
                                on='click'
                                pinned
                                basic
                                position='bottom right'
                                eventsEnabled={true}
                                trigger={<img class="ui mini circular image" src={this.state.image} />}
                                open={this.state.popupOpen}
                                onOpen={this.handlePopupOpen}
                            />
                            <EditFormModal
                                modalOpen={this.state.showEditForm}
                                name={this.state.DisplayName}
                                image={this.state.image}
                                handleClose={
                                    () => {
                                        this.setState({
                                            showEditForm: false
                                        })
                                    }
                                }
                                handleUpdate={
                                    () => {
                                        this.setState({
                                            updateChart: ((this.state.updateChart + 1) % 10)
                                        })
                                    }
                                }
                            />
                        </Menu.Item>
                    </Menu>
                    {/*<Layout username={this.state.username} isUserRegistered={this.state.isUserRegistered} />*/}
                    


                    <Home username={this.state.username} isUserRegistered={this.state.isUserRegistered} searchedQuery={this.state.searchedValue} username={this.state.username} chartType={this.state.chartType} updateChart={this.state.updateChart} />
                </div>
            );
        }
    }
    async populateUsernaameData() {
        const response = await fetch('api/username');
        const username = await response.json();

        const responseForRegisterUser = await fetch('api/isRegisteredUserOrNot');
        const isUserRegistered = await responseForRegisterUser.json();
        this.setState({ username: username[0], isUserRegistered: isUserRegistered });

        const responseForregisteredUserInformation = await fetch('api/registeredUserInformation');
        const LoggedOnUserData = await responseForregisteredUserInformation.json();


        var i;
        for (i = 0; i < LoggedOnUserData.length; i++) {
            if (LoggedOnUserData[i].employeeUsername === username[0]) {
                this.setState({
                    DisplayName: LoggedOnUserData[i].displayName,
                    ReportingManagerUserName: LoggedOnUserData[i].reportingManagerUserName,
                    EmployeeUsername: LoggedOnUserData[i].employeeUsername,
                    Email: LoggedOnUserData[i].email,
                    image: LoggedOnUserData[i].profilepicPath,
                    DepartmentName: LoggedOnUserData[i].departmentName,
                    Designation: LoggedOnUserData[i].designation,
                    Office: LoggedOnUserData[i].office
                });
            }
        }

    }
}



