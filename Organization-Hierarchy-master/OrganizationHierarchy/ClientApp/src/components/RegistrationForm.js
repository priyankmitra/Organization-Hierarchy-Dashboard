import React, { Component } from 'react';
import { Form, Input, Segment, Button, Grid, Icon, Divider } from 'semantic-ui-react';
import { Home } from './Home';
import "./RegistrationForm.css";
import  App from '../App.js'

import user from './user.png';
export class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EmployeeId: "",
            DisplayName: "",
            ReportingManagerUserName: "",
            EmployeeUsername: "",
            Email: "",
            Profilepic: null,
            UserRegisteredOrNot: 0,
            DepartmentName: "",
            Designation: "",
            Office: "",
            showChart: false,
            RmList: [],
            imgsrc: null

        };
        this.setAdData();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImage = this.handleImage.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });

       console.log([event.target.name]);
    }
    handleImage(event) {
        this.setState({ Profilepic: event.target.value });
        console.log(53);
        console.log(this.state);
        
        const currentfile = event.target.files[0]
        const filereader = new FileReader()
        filereader.addEventListener("load", () => {
            
            this.setState({
                imgsrc: filereader.result
            })
        }, false)

        filereader.readAsDataURL(currentfile);


        /* this.setState({ imagePath: event.target.value })*/
    }   
   
    handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        data.append("EmployeeId", this.state.EmployeeId);
        data.append("DisplayName", this.state.DisplayName);
        data.append("EmployeeUsername", this.state.EmployeeUsername);
        data.append("Email", this.state.Email);
        console.log(55);
        //console.log(this.state.Profilepic);
        //data.append("Profilepic", this.state.Profilepic);
        console.log(event.target    );
        console.log(data.get('DepartmentName'));
        fetch('api/registerUser', {
            method: 'POST',
            body: data

        }).then((Response) => {
            /*if (Response.status === 200) {
                alert("User Successfully Registered.");
            }*/
            this.setState({
                showChart: true
            });
        }).catch((error) => console.log(error));

    }
    render() {
        return this.state.showChart ? <App /> :
            <div className="zer">
                <Segment raised style={{ marginLeft: "300px", marginRight: "300px", marginTop: "-20px", marginBottom: "0px", padding: "0px" }}>
                    <div className="zero">
                        <div class="ui grid" style={{ padding: "15px" }}>
                            <div class="eight wide column" >


                                <div style={{ display: "flex", marginLeft: "70px", marginRight: "2px", marginTop: "220px" }}>
                                    <div>
                                        {this.state.imgsrc !== null ?
                                            (
                                                <div>
                                                    {console.log(235)}
                                                    <img src={this.state.imgsrc} height="200" width="250" />
                                                </div>) :
                                            <img src={user} height="230" width="250" />

                                        }
                                    </div>
                                </div>
                                <h2 class="ui center aligned black header" style={{ marginTop: "0px" }}> User Name</h2>
                            </div>
                            <div class="eight wide column">
                                <h2 style={{ color: "white", textAlign: "center", fontFamily: "Century Gothic" }}>Registration Form</h2>
                                <Form onSubmit={this.handleSubmit}  >
                                    <Form.Field fluid>
                                        <label style={{ color: "white", fontFamily: "Century Gothic" }}>Employee Id</label>
                                        <Input disabled type='id' name='EmployeeId' placeholder='Employee Id' defaultValue={this.state.EmployeeId} onChange={this.handleChange} />
                                    </Form.Field>
                                    <Form.Field fluid>
                                        <label style={{ color: "white", fontFamily: "Century Gothic" }}>Employee Display Name</label>
                                        <Input disabled type='displayname' name='DisplayName' placeholder='Display Name' defaultValue={this.state.DisplayName} onChange={this.handleChange} />
                                    </Form.Field>
                                    <Form.Field fluid>
                                        <label style={{ color: "white", fontFamily: "Century Gothic" }}>Employee Username</label>
                                        <Input disabled type='name' name='EmployeeUsername' placeholder='Username' defaultValue={this.state.EmployeeUsername} onChange={this.handleChange} />
                                    </Form.Field>

                                    <Form.Field fluid focus>
                                        <label style={{ color: "white", fontFamily: "Century Gothic" }}>Email</label>
                                        <Input disabled type='email' name='Email' placeholder='example@gmail.com' focus defaultValue={this.state.Email} onChange={this.handleChange} />
                                    </Form.Field>

                                    <Form.Field fluid name='Designation' focus defaultValue={this.state.Designation} >
                                        <label style={{ color: "white", fontFamily: "Century Gothic" }}>Designation</label>
                                        <select name='Designation'  class="ui search dropdown" onChange={this.handleChange}>
                                            <option value={this.state.Designation}>{this.state.Designation}</option>
                                            <option value='VP'>VP</option>
                                            <option value='AVP'>AVP</option>
                                            <option value='Technical Architect'>Technical Architect</option>
                                            <option value='Project Manager'>Project Manager</option>
                                            <option value='Tech Lead'>Tech Lead</option>
                                            <option value='Senior Software Engineer'>Senior Software Engineer</option>
                                            <option value='Software Engineer'>Software Engineer </option>
                                            <option value='Trainee Software Engineer'>Trainee Software Engineer </option>
                                            <option value='Intern'>Intern</option>
                                        </select>
                                    </Form.Field>


                                    <Form.Field fluid name='DepartmentName' focus defaultValue={this.state.DepartmentName} >
                                        <label style={{ color: "white", fontFamily: "Century Gothic" }}>Department</label>
                                        <select name='DepartmentName' class="ui search dropdown" onChange={this.handleChange}>
                                            <option value={this.state.DepartmentName}>{this.state.DepartmentName}</option>
                                            <option value='IT'>IT</option>
                                            <option value='Accounts'>Accounts</option>
                                        </select>
                                    </Form.Field>

                                    <Form.Field fluid name='ReportingManagerUserName' focus required >
                                        <label style={{ color: "white", fontFamily: "Century Gothic" }}>Reporting Manager</label>
                                        <select name='ReportingManagerUserName' class="ui search dropdown" onChange={this.handleChange}>
                                            <option value=''>Select Reporting Manager</option>
                                            {this.state.RmList.map(rm =>

                                                <option key={rm.employeeId} value={rm.employeeUsername}>{rm.displayName}({rm.employeeUsername})</option>

                                            )}
                                        </select>
                                    </Form.Field>

                                    <Form.Field fluid>
                                        <label style={{ color: "white", fontFamily: "Century Gothic" }}>Profile Picture</label>
                                        <Input type='file' name='Profilepic' icon={<Icon name='user' inverted circular link />} focus onChange={this.handleImage} />
                                    </Form.Field>


                                    <Form.Field fluid focus name='Office' defaultValue={this.state.Office}  >
                                        <label style={{ color: "white", fontFamily: "Century Gothic" }}>Office</label>
                                        <select name='Office' class="ui search dropdown" onChange={this.handleChange}>
                                            <option value={this.state.Office}> {this.state.Office}</option>
                                            <option value='Backoffice Center-1'>Backoffice Center-1</option>
                                            <option value='Backoffice Center-2'>Backoffice Center-2</option>
                                            <option value='Backoffice Center-3'>Backoffice Center-3</option>
                                            <option value='Corporate headquarters'>Corporate headquarters</option>
                                        </select>
                                    </Form.Field>
                                    
                                    <Grid>
                                        <Grid.Column textAlign="center">
                                            <Form.Field>
                                                <Button type="submit" color='white'>Submit</Button>
                                            </Form.Field>
                                        </Grid.Column>
                                    </Grid>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Segment>
            </div>
    }

    async setAdData() {
        const response = await fetch('api/ad_data');
        const data = await response.json();

        const Rmresponse = await fetch('api/rm_data');
        const RmData = await Rmresponse.json();
        console.log(RmData);
        //RmData.append("NAV");

        this.setState({

            EmployeeId: data[0].employeeId,
            DisplayName: data[0].displayName,
            EmployeeUsername: data[0].employeeUsername,
            Email: data[0].email,
            DepartmentName: data[0].department,
            Designation: data[0].designation,
            Office: data[0].officeName,/*
            Region: data[0].region,*/
            RmList: RmData
        });
    }
}