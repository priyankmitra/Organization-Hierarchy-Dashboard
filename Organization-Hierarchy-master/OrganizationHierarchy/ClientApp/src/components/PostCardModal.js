import React, { Component } from 'react';
import { Home } from './Home';
import { Button, Header, Image, Modal , Grid, Container, Segment, Card} from 'semantic-ui-react'

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
                closeIcon={{ style: { top: '1.0535rem', right: '1rem' }, color: 'black', name: 'close' }}
            >
                {/*<Header as='h2'>
                    <Image circular src={this.props.image} /> {this.props.name}
                </Header>*/}

                <Modal.Content>

                    {/* <Modal.Description>
                        <Segment.Group horizontal>
                            <Segment><Segment.Group raised>
                                    <Segment>{this.props.designation}</Segment>
                                    <Segment>{this.props.department}</Segment>
                                    <Segment>{this.props.email}</Segment>
                                    <Segment>{this.props.office}</Segment>
                            </Segment.Group></Segment>
                        </Segment.Group>
                        </Modal.Description>*/}
                    <Card>
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
                        <Button color='green' onClick={this.props.handleClose} inverted>
                                Close
                        </Button>
                    </div>
                </Modal.Actions>
                   
                </Modal>
            );
    }
        
}

export default PostCardModal