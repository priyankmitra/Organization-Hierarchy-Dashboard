import React, { Component } from 'react';
import { Home } from './Home';
import { Button, Header, Image, Modal, Grid, Container, Segment, Card, Icon} from 'semantic-ui-react'

 class PostCardModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            

        };
        
    }
    render() {
        return (
            <Modal open={this.props.modalOpen} style={{
                width: 350,
                height: 330,
                marginLeft: 500,
                marginTop: 150

            }}
                dimmer={false}
            >
                <Modal.Content>
                    <Card style={{ marginLeft : 8 }}>
                        <Card.Content>
                            <Image
                                floated='left'
                                size='tiny'
                                src={this.props.image}
                            />
                            <Card.Header>{this.props.name}</Card.Header>
                            <Card.Meta>
                                {this.props.designation} , {this.props.department}
                            </Card.Meta>
                            <Card.Description>
                                <h7><i class="envelope open icon"></i>{this.props.email}</h7>
                                <br />
                                <h7><i class="phone  icon"></i>1526</h7>
                                <br />
                                <h7><i class="building  icon"></i>{this.props.office}</h7>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Modal.Content>
                
                 <Modal.Actions>
                    <div align="center">
                        <Button icon onClick={this.props.handleClose} ><Icon name='close' /></Button>
                    </div>
                </Modal.Actions>
                   
                </Modal>
            );
    }
        
}

export default PostCardModal