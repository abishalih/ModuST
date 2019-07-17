import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react'
import { 
    Grid, Segment, Menu,
    Header, Button, Form, 
} from 'semantic-ui-react'
import { connect } from 'react-redux';
import actions from '../../../actions';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            //Data Auth
            employeeID  : '',
            name        : '',
            fullname    : '',
            branch      : '',
            department  : '',
            division    : '',
            //Data Auth
        }  
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }

    //EventHandler 
    handleOnChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }
    
    handleOnChangeSelect = (name, value) => {
        this.setState({ [name]: value });
    }
    //EventHandler 

    //Form 
    register = (event) => {
        event.preventDefault();
        const payload = {
            employeeID : this.state.employeeID
        };

        this.props.registerDispatch(payload);
    }
    
    render() {
        //const {optionBranch, optionDepartment, optionDivision, optionPosition}=this.state
        return (
            <div>
                <Menu 
                    attached='top'
                    color='blue'
                    inverted
                />
                <Segment attached='bottom'>
                    <Grid divided style={{padding:'1em'}}>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as='h4'>Register</Header><br/>
                                <Form style={{textAlign:'left'}}>
                                    <Form.Group widths='equal'>
                                        <Form.Input fluid label='Employee ID' placeholder='Employee ID' name='employeeID' onChange={this.handleOnChange}/>
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Input 
                                            fluid label='Full Name' 
                                            placeholder='Full Name' 
                                            name='fullname' 
                                            onChange={this.handleOnChange} 
                                            value={this.state.name} 
                                        />
                                        <Form.Input 
                                            fluid label='Nick Name' 
                                            placeholder='Nick Name' 
                                            name='name' 
                                            onChange={this.handleOnChange} 
                                            value={this.state.name} 
                                        />
                                    </Form.Group>
                                    <Form.Select 
                                        fluid label='Branch' 
                                        options={this.state.optionBranch} 
                                        placeholder='Branch'  
                                        value={this.state.branch}
                                        onChange={(event, {value})=>{this.handleOnChangeSelect('branch', value)}
                                    />
                                    <Form.Group widths='equal'>
                                        <Form.Select 
                                            fluid label='Department' 
                                            options={this.state.optionDepartment} 
                                            placeholder='Department'  
                                            value={this.state.department}
                                            onChange={(event, {value})=>{this.handleOnChangeSelect('department', value)}
                                        />
                                        <Form.Select 
                                            fluid label='Division' 
                                            options={this.state.optionDivision} 
                                            placeholder='Division'  
                                            value={this.state.division}
                                            onChange={(event, {value})=>{this.handleOnChangeSelect('division', value)}
                                        />
                                    </Form.Group>
                                    <Button 
                                        color='blue'
                                        type='submit'
                                    >
                                        Register
                                    </Button>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        )
    }
}   
const mapStateToProps = (state) => ({
    userInfo      : state.user.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
    registerDispatch: (req,res,err) => dispatch(actions.user.api.registerUser(req,res,err)),
});
export default connect(mapStateToProps,mapDispatchToProps)(Register);