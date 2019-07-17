import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react'
import {
    Container,
    Table,
    // DynamicImport,
    // Loader as LoadingAnimation,
} from '../../components'
import { connect } from 'react-redux';
import { 
    Grid, Segment, Menu,
    Header, Button, Icon, 
    Modal, Form,
} from 'semantic-ui-react'
import axios from 'axios';
// import history from '../../helpers/history'

class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            // User Info
            isLogin               : this.props.isLogin,
            userID                : this.props.userInfo.userID,
            // User Info
      
            // Master
            optionUtility         : [],
            optionCategory        : [],
            ticketModal           : false, 
            detailTicketModal     : false, 
            orderTicketModal      : false, 
            // Master
            
            // Data Tabel
            listTicket            : [],
            detailTicketID        : ``,
            detailCategory        : ``,
            asset                 : ``,
            // Data Tabel
            
            //Create New Ticket
            newTicketID           : ``,
            utility               : ``,
            category              : ``,
            note                  : ``,
            //Create New Ticket
        }
        this.checkInterval = null;
        this.handleTicketDetail = this.handleTicketDetail.bind(this)
    }
    
    componentDidMount(){
        this.initFunction()
    }

    initFunction = () => {
        this.getListTicket()
        this.getListUtility()
        this.generateTicketID()
        // if (!this.state.isLogin) {
        //     history.push('/user')
        // }
        // else{
        //     this.getListTicket()
        //     this.getListUtility()
        //     this.generateTicketID()
        // }
    } 

    componentWillUnmount() {
        clearInterval(this.checkInterval);
        this.setState = (state,callback)=>{
            return;
        };
    }

    generateTicketID = () => {
        axios.get(`http://api-ticketing.com/api-modust/ticket/generate_ticket_id`)
            .then(res => {
                const newTicketID = res.data;
                this.setState({newTicketID})
            })
    }
    
    getListUtility = () => {
        axios.get(`http://api-ticketing.com/api-modust/master/list_utility/user/`+this.state.userID)
            .then(res => {
                const resUtility = res.data;
                let optionUtility = [];
                optionUtility.push({
                    key:`0`,
                    text:`Please Select Your Utility`,
                    value:``
                })
                resUtility.map((utility)=>{
                    optionUtility.push({
                    key     : utility.pid,
                    text    : utility.name+` (`+utility.alias+`)`,
                    value   : utility.pid
                    });
                    return '';
                });
                this.setState({ optionUtility });
            })
    }
    
    getListTicket = () => {
       axios.get(`http://api-ticketing.com/api-modust/ticket/list_ticket/user_id/`+this.state.userID)
            .then(res => {
                const listTicket = res.data;
                if(listTicket.length>0){
                    listTicket.map((ticket, key)=>{
                        listTicket[key].actions = ticket.ticket_id;
                        return '';
                    });
                    this.setState({ listTicket });
                }
            })
    }

    // EventHandler
    handleOnChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }
    handleOnChangeSelect = (name, value) => {
        this.setState({ [name]: value });
    }
    handleTicketDetail(event, idx, row) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ 
            detailCategory : row.category, 
            detailTicketID : row.ticket_id, 
        });
        this.detailTicket()
    }
    // EventHandler

    //Modal

    closeModal = (targetModal) => { 
        this.setState({ 
            [targetModal] : false,
        }, ()=>{
            this.getListTicket()
        });
    }
    //Modal

    //Ticketing
    getListCategory = (utility) => {
        axios.get(`http://api-ticketing.com/api-modust/ticket/list_category_utility/utility/`+utility+`/user/`+this.state.userID)
            .then(res => {
            const resCategory = res.data;
            let optionCategory = [];
            optionCategory.push({
                key:`0`,
                text:`Please Select Your Category`,
                value:``
            })
            resCategory.map((category)=>
                optionCategory.push({
                key:category.pid,
                text:category.name,
                value:category.pid
                })
            );
            this.setState({ optionCategory });
            });
        this.setNewTicket('utility', utility);
    }

    newTicket = () => {
        this.setState({ticketModal:true});
    }
    detailTicket = () => {
        this.setState({detailTicketModal:true});
    }

    setNewTicket = (name, value) => {
        this.setState({ [name]: value });
    }

    //Form 
    submitNewTicket = (event) => {
        event.preventDefault();
        axios.post('http://api-ticketing.com/api-modust/ticket/create_ticket', {
            ticket_id : this.state.newTicketID
            , utility   : this.state.utility
            , category  : this.state.category
            , note      : this.state.note
            , user      : this.state.userID
        })
        .then(() => {
            this.setState({
            newTicketID : ``
            , utility   : ``
            , category  : ``
            , note      : ``
            });
            this.getListTicket()
            this.generateTicketID()
            this.getListUtility()
            this.closeModal(`ticketModal`);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    //Form 

    addTicketPart = () => {
        this.setState({
            orderCategory:`Part`,
            orderTicketModal:true,
        });
    }
    addTicketService = () => {
        this.setState({
            orderCategory:`Service`,
            orderTicketModal:true,
        });
    }
    addTicketItem = () => {
        this.setState({
            orderCategory:`Item`,
            orderTicketModal:true,
        });
    } 
    render() {
        return (
            <div>
                <Menu 
                    attached='top'
                    color='blue'
                    inverted
                >
                    <Menu.Menu position='left'>
                        <Menu.Item as={Header}>
                            Ticketing System
                        </Menu.Item>
                    </Menu.Menu>
                    <Menu.Menu position='right'>
                    </Menu.Menu>
                </Menu>
                <Segment attached='bottom'>
                    <Grid style={{textAlign:'right'}}>
                        <Grid.Row>
                            <Grid.Column>
                                <Button 
                                    icon 
                                    labelPosition='left' 
                                    color='blue' 
                                    size='small' 
                                    onClick={this.newTicket}
                                >
                                    <Icon name='plus square' />
                                    New Ticket
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                            <Table 
                                listData={this.state.listTicket}
                                handleDetail={this.handleTicketDetail}
                            />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>

                {/* Modal Ticket */}
                <Modal
                    open={this.state.ticketModal}
                    closeOnEscape={true}
                    closeOnDimmerClick={false}
                    onClose={(e) => this.closeModal(`ticketModal`)}
                    size='tiny'
                    dimmer='blurring'
                >
                    <Modal.Header>
                        <Header as='h4'>
                        <Icon name='ticket' />
                        <Header.Content>
                            New Ticket
                            <Header.Subheader>Create ticket as your gateway request</Header.Subheader>
                        </Header.Content>
                        </Header>
                    </Modal.Header>
                    <Modal.Content>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form>
                                        <Form.Input fluid readOnly label='Ticket' value={this.state.newTicketID}/>
                                        <Form.Select 
                                            search fluid 
                                            label='Utility' 
                                            options={this.state.optionUtility} 
                                            placeholder='Utility' 
                                            value={this.state.utility}
                                            onChange={(e, {value})=>this.getListCategory(value)}
                                        />
                                        <Form.Select 
                                            search fluid 
                                            label='Category' 
                                            options={this.state.optionCategory} 
                                            placeholder='Category' 
                                            value={this.state.category}
                                            onChange={(event, {value})=>{this.handleOnChangeSelect('category', value)}}
                                        />
                                        <Form.TextArea 
                                            label='Note' 
                                            name='note' 
                                            placeholder='Place Your Note Here' 
                                            onChange={this.handleOnChange}
                                        />
                                    </Form><br/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button 
                            disabled={
                            !this.state.newTicketID ||
                            !this.state.utility ||
                            !this.state.category ||
                            !this.state.note 
                            }
                            onClick={this.submitNewTicket} 
                            color='blue' 
                        >
                            <Icon name='check' />
                            Create Ticket
                        </Button>
                        <Button onClick={(e) => this.closeModal(`ticketModal`)} color='red'>
                            <Icon name='times' />
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>
                {/* Modal Ticket */}

                {/* Modal Detail Ticket */}
                <Modal
                    open={this.state.detailTicketModal}
                    closeOnEscape={true}
                    closeOnDimmerClick={false}
                    onClose={(e) => this.closeModal(`detailTicketModal`)}
                    size='large'
                    dimmer='blurring'
                >
                    <Modal.Header>Detail Ticket</Modal.Header>
                    <Modal.Content 
                    style={{
                        maxHeight:'350px',
                        minHeight:'500px',
                        overflowY:'scroll',
                    }}
                    >
                        <TicketDetail 
                            ticketID={this.state.detailTicketID} 
                            category={this.state.detailCategory} 
                            userInfo={this.props.userInfo} 
                        />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={(e) => this.closeModal(`detailTicketModal`)} color='red'>
                            <Icon name='times' />
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>
                {/* Modal Detail Ticket */}
            </div>
        );
    }
}
const TicketDetail = (props) => {
    
}

const mapStateToProps = (state) => ({
    isLogin         : state.user.isLogin,
    userInfo        : state.user.userInfo,
});
const App = connect(mapStateToProps,null)(Content);

const Ticket = () => {
    return (
        <div>
            <Container contents={<App />}/>
        </div>
    )
}
export default Ticket;