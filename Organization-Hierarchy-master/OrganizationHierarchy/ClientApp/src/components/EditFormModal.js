import React, { Component } from 'react';
import { Home } from './Home';
import { Button, Header, Image, Modal, Form, Input, Segment, Grid, Icon, Label } from 'semantic-ui-react'

class EditFormModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EmployeeId: "",
            DisplayName: "",
            ReportingManagerUserName: "",
            EmployeeUsername: "",
            Email: "",
            Profilepic: this.props.image,
            UserRegisteredOrNot: 0,
            DepartmentName: "",
            Designation: "",
            Office: "",
            Region: "",
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

    }  
    handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        data.append("EmployeeId", this.state.EmployeeId);
        data.append("DisplayName", this.state.DisplayName);
        data.append("EmployeeUsername", this.state.EmployeeUsername);
        data.append("Email", this.state.Email);
        /*console.log(this.state);
        console.log(data.get('ReportingManagerUsername'));*/
        fetch('api/registerUser', {
            method: 'POST',
            body: data

        }).then((Response) => {
            /*if (Response.status === 200) {
                alert("Data Sucessfully Updated.");
            }*/
            this.setState({
                showChart: true
            });
        }).catch((error) => console.log(error));
    }




    render() {
        return /*this.state.showChart === true ? <Home isUserRegistered={1} / > :*/(

            <Modal open={this.props.modalOpen} basic  style={{
                width: 500,
                height: 550,
                marginLeft: 450,
                marginTop: 50
            }}
                
                >
                    <Modal.Header>
                        {this.state.imgsrc !== null ?
                        (
                            <div>
                                    <img class="ui avatar circular mini image" src={this.state.imgsrc} />
                                    <span>{this.props.name}</span>
                                </div>) :
                            <div>
                                <img class="ui avatar circular mini image" src={this.props.image} />
                            <span>
                                {this.props.name}
                                <Button style={{ marginLeft : 160 }} color='green' onClick={this.props.handleClose} inverted>
                                        Close
                        </Button>

                            </span>
                            </div>
                        }
                        
                    </Modal.Header>
                <Modal.Content scrolling>
                        <Form onSubmit={this.handleSubmit}  >
                        {/*<Form.Field fluid>
                               <label>Employee Id</label>
                                <Input disabled type='id' name='EmployeeId' placeholder='Employee Id' defaultValue={this.state.EmployeeId} onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field fluid>
                                <label>Employee Display Name</label>
                                <Input disabled type='displayname' name='DisplayName' placeholder='Display Name' defaultValue={this.state.DisplayName} onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field fluid>
                                <label>Employee Username</label>
                                <Input disabled type='name' name='EmployeeUsername' placeholder='Username' defaultValue={this.state.EmployeeUsername} onChange={this.handleChange} />
                            </Form.Field>

                            <Form.Field fluid>
                                <label>Email</label>
                                <Input disabled type='email' name='Email' placeholder='example@gmail.com' defaultValue={this.state.Email} onChange={this.handleChange} />
                            </Form.Field>*/}
                        <Label color={'green'}>Designation</Label>
                        <Form.Field fluid required color={'blue'} name='Designation' focus defaultValue={this.state.Designation} control='select' onChange={this.handleChange} >
                            
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
                            </Form.Field>

                        <Label color={'green'}>Department</Label>
                            <Form.Field fluid required  name='DepartmentName' focus defaultValue={this.state.DepartmentName} control='select' onChange={this.handleChange}>
                                <option value={this.state.DepartmentName}>{this.state.DepartmentName}</option>
                                <option value='IT'>IT</option>
                                <option value='Accounts'>Accounts</option>
                        </Form.Field>
                        <Label color={'green'}>Reporting Manager</Label>
                        <Form.Field fluid name='ReportingManagerUserName' focus control='select' required onChange={this.handleChange}>
                            
                            <option value=''>Select Reporting Manager</option>
                                {this.state.RmList.map(rm =>

                                    <option key={rm.employeeId} value={rm.employeeUsername}>{rm.displayName}({rm.employeeUsername})</option>

                                )}
                            </Form.Field>

                            <Form.Field fluid>
                            <Label color={'green'}>Profile Picture</Label>
                                <Input type='file' name='Profilepic' icon={<Icon name='user' inverted circular link />} focus onChange={this.handleImage} />
                            </Form.Field>

                        <Label color={'green'}>Office</Label>
                            <Form.Field fluid required  control='select' focus name='Office' defaultValue={this.state.Office} onChange={this.handleChange}  >
                                <option value={this.state.Office}> {this.state.Office}</option>
                                <option value='Backoffice Center-1'>Backoffice Center-1</option>
                                <option value='Backoffice Center-2'>Backoffice Center-2</option>
                                <option value='Backoffice Center-3'>Backoffice Center-3</option>
                                <option value='Corporate headquarters'>Corporate headquarters</option>
                            </Form.Field>


                            <Grid>
                                <Grid.Column textAlign="center">
                                    <Form.Field>
                                        <Button fluid type="Update" color='blue'>Update</Button>
                                    </Form.Field>
                                </Grid.Column>
                            </Grid>
                        </Form>
                </Modal.Content>
                {/*<Modal.Actions>
                    <div align="center">
                        <Button color='green' onClick={this.props.handleClose} inverted>
                            Close
                        </Button>
                    </div>
                </Modal.Actions>*/}

                </Modal>
        );
    }
    async setAdData() {
        const response = await fetch('api/ad_data');
        const data = await response.json();

        const Rmresponse = await fetch('api/rm_data');
        const RmData = await Rmresponse.json();
        this.setState({

            EmployeeId: data[0].employeeId,
            DisplayName: data[0].displayName,
            EmployeeUsername: data[0].employeeUsername,
            Email: data[0].email,
            DepartmentName: data[0].department,
            Designation: data[0].designation,
            Office: data[0].officeName,
            Region: data[0].region,
            RmList: RmData
        });
        
    }

}

export default EditFormModal