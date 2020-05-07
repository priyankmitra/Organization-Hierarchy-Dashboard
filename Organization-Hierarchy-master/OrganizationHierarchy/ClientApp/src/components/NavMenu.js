import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Button, Image, Modal, Card ,Popup} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import  EditFormModal  from './EditFormModal';



export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
      this.state = {
          collapsed: true,
          showEditForm: false,
          DisplayName: "",
          ReportingManagerUserName: "",
          EmployeeUsername: "",
          Email: "",
          image : null,
          DepartmentName: "",
          Designation: "",
          Office: "",
          popupOpen: false
      };
      this.handleSubmit = this.handleSubmit.bind(this);
  }
   handlePopupOpen = () => {
        this.setState({ popupOpen: true });
    }
  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

    handleSubmit() {
        this.setState({
            popupOpen:false,
            showEditForm: true
        })
    }

    componentDidMount() {
        this.populateLogedInUserInformation();
    }
    render() {

        if (this.props.isUserRegistered == 1) {
            return (
                <header>
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 " light>
                        <Container>
                            <NavbarBrand tag={Link} to="/">Organization Hierarchy</NavbarBrand>
                            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                                <ul className="navbar-nav flex-grow">
                                    
                                    
                                    <li><Button className="ui black basic button"   >{this.props.username}</Button></li>

                                    <Popup
                                        content={
                                            <Card>
                                                <Card.Content>
                                                    <Image
                                                        floated='left'
                                                        size='tiny'
                                                        src={this.state.image}
                                                    />
                                                    <Card.Header>{this.state.DisplayName}</Card.Header>
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
                                                this.setState({ showEditForm: false })
                                            }
                                        }
                                    />
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>
                </header>
            );
        }
        else {
            return (
                <header>
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                        <Container>
                            <NavbarBrand tag={Link} to="/">Organization Hierarchy</NavbarBrand>
                            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                                <ul className="navbar-nav flex-grow">
                                    <li><Button className="ui black basic button"   >{this.props.username}</Button></li>
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>
                </header>
            );
        }
    
    }

    async populateLogedInUserInformation (){

        var username = this.props.username;

        const responseForregisteredUserInformation = await fetch('api/registeredUserInformation');
        const data = await responseForregisteredUserInformation.json();


        var i;
        for (i = 0; i < data.length; i++) {
            if (data[i].employeeUsername === username) {
                this.setState({
                    DisplayName: data[i].displayName,
                    ReportingManagerUserName: data[i].reportingManagerUserName,
                    EmployeeUsername: data[i].employeeUsername,
                    Email: data[i].email,
                    image: data[i].profilepicPath,
                    DepartmentName: data[i].departmentName,
                    Designation: data[i].designation,
                    Office: data[i].office
                });   
            }
        }
    
        console.log("is state ko deko");
        console.log(this.state);

    }
    
}
