import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react'
import { 
    Grid, Segment, Menu,
    Header, Button, Form, 
    Icon, Divider,
} from 'semantic-ui-react'
import { connect } from 'react-redux';
import actions from '../../../actions';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            //Data 
            employeeID      : '',
            password        : '',

            registerEmployeeID      : '',
            nickname                : '',
            fullname        : '',
            branch          : '',
            department      : '',
            division        : '',
            //Data 

            //Options 
            optionCompany      : [],
            optionBranch        : [],
            optionDepartment    : [],
            optionDivision      : [],
            optionPosition      : [],
            //Options 
        }  
    }
    
    componentDidMount(){
        this.initFunction()
    }

    initFunction = () => {
        this.getListCompany()
        this.getListDepartment()
    }
    
    clearRegister = () => {
        this.setState({
            registerEmployeeID      : '',
            nickname                : '',
            fullname        : '',
            branch          : '',
            department      : '',
            division        : '',
            optionCompany      : [],
            optionBranch        : [],
            optionDepartment    : [],
            optionDivision      : [],
            optionPosition      : [],
        }, ()=>{
            this.initFunction();
        });
    }
    
    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }
    
    getListCompany = () => {
        axios.get(`http://api-ticketing.com/api-modust/master/list_company`)
            .then(res => {
                const resCompany = res.data;
                let optionCompany = [];
                optionCompany.push({
                    key:`0`,
                    text:`Please Select Your Company`,
                    value:``
                })
                resCompany.map((company)=>{
                    optionCompany.push({
                        key     : company.pid,
                        text    : company.alias,
                        value   : company.pid
                    });
                    return '';
                });
                this.setState({ optionCompany });
            })
    }

    getListDepartment = () => {
        axios.get(`http://api-ticketing.com/api-modust/master/list_department`)
            .then(res => {
                const resDepartment = res.data;
                let optionDepartment = [];
                optionDepartment.push({
                    key:`0`,
                    text:`Please Select Your Department`,
                    value:``
                })
                resDepartment.map((branch)=>{
                    optionDepartment.push({
                        key     : branch.pid,
                        text    : branch.name+` (`+branch.alias+`)`,
                        value   : branch.pid
                    });
                    return '';
                });
                this.setState({ optionDepartment});
            })
    }

    //EventHandler 
    handleOnChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }
    
    handleOnChangeSelect = (name, value) => {
        this.setState({ [name]: value }, ()=>{
            if(name==='company'){
                if(this.state.company){
                    axios.get(`http://api-ticketing.com/api-modust/master/list_branch/company/`+this.state.company)
                        .then(res => {
                            const resBranch = res.data;
                            let optionBranch = [];
                            optionBranch.push({
                                key:`0`,
                                text:`Please Select Your Branch`,
                                value:``
                            })
                            resBranch.map((branch)=>{
                                optionBranch.push({
                                    key     : branch.pid,
                                    text    : branch.name+` (`+branch.alias+`)`,
                                    value   : branch.pid
                                });
                                return '';
                            });
                            this.setState({ optionBranch });
                        })
                }
                else{
                    let optionBranch = [];
                    optionBranch.push({
                        key:`0`,
                        text:`Please Select Your Branch`,
                        value:``
                    })
                    this.setState({ optionBranch });
                }
            }
            else if(name==='department'){
                if(this.state.department){
                    axios.get(`http://api-ticketing.com/api-modust/master/list_division/department/`+this.state.department)
                        .then(res => {
                            const resDivision = res.data;
                            let optionDivision = [];
                            optionDivision.push({
                                key:`0`,
                                text:`Please Select Your Division`,
                                value:``
                            })
                            resDivision.map((division)=>{
                                optionDivision.push({
                                    key     : division.pid,
                                    text    : division.name+` (`+division.alias+`)`,
                                    value   : division.pid
                                });
                                return '';
                            });
                            this.setState({ optionDivision });
                        })
                }
                else{
                    let optionDivision = [];
                    optionDivision.push({
                        key:`0`,
                        text:`Please Select Your Division`,
                        value:``
                    })
                    this.setState({ optionDivision });
                }
            }
        });
    }
    //EventHandler 

    //Form 
    login = (event) => {
        event.preventDefault();
        const payload = {
            employeeID : this.state.employeeID,
            password    : this.state.password
        };

        this.props.loginDispatch(payload);
    }
    register = (event) => {
        event.preventDefault();
        const payload = {
            employee_id : this.state.registerEmployeeID,
            nickname    : this.state.nickname,
            fullname    : this.state.fullname,
            branch      : this.state.branch,
            department  : this.state.department,
            division    : this.state.division,
        };
        
        this.props.registerDispatch(payload);
        this.clearRegister();
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
                        <Divider horizontal>
                            <Header as='h4'>
                                <Icon name='user' />
                                Login Menu
                            </Header>
                        </Divider>
                        <Grid.Row>
                            <Grid.Column >
                                <Form style={{textAlign:'left'}}>
                                    <Form.Group widths='equal'>
                                        <Form.Input 
                                            fluid 
                                            label='Employee ID' 
                                            name='employeeID' 
                                            width={16} 
                                            placeholder='Employee ID'
                                            value={this.state.employeeID} 
                                            onChange={this.handleOnChange}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Input 
                                        fluid 
                                        label='Password' 
                                        type='password' 
                                        name='password' 
                                        placeholder='Password'
                                        width={16} 
                                        value={this.state.password} 
                                        onChange={this.handleOnChange}
                                        />
                                    </Form.Group><br/>
                                    <Button 
                                        style={{fontSize:'12pt'}} 
                                        color='blue' 
                                        onClick={this.login}
                                        disabled={
                                            !this.state.employeeID || !this.state.password
                                        }
                                    >
                                        Login
                                    </Button>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider horizontal>
                            <Header as='h4'>
                                <Icon name='user' />
                                Register
                            </Header>
                        </Divider>
                        <Grid.Row>
                            <Grid.Column>
                                <Form style={{textAlign:'left'}}>
                                    <Form.Input fluid label='Employee ID' placeholder='Employee ID' name='registerEmployeeID' onChange={this.handleOnChange}/>
                                    <Form.Input 
                                        fluid label='Full Name' 
                                        placeholder='Full Name' 
                                        name='fullname' 
                                        onChange={this.handleOnChange} 
                                        value={this.state.fullname} 
                                    />
                                    <Form.Input 
                                        fluid label='Nick Name' 
                                        placeholder='Nick Name' 
                                        name='nickname' 
                                        onChange={this.handleOnChange} 
                                        value={this.state.nickname} 
                                    />
                                    <Form.Select 
                                        fluid label='Company' 
                                        options={this.state.optionCompany} 
                                        placeholder='Company'  
                                        value={this.state.company}
                                        onChange={(event, {value})=>{this.handleOnChangeSelect('company', value)}}
                                    />
                                    <Form.Select 
                                        fluid label='Branch' 
                                        options={this.state.optionBranch} 
                                        placeholder='Branch'  
                                        value={this.state.branch}
                                        onChange={(event, {value})=>{this.handleOnChangeSelect('branch', value)}}
                                    />
                                    <Form.Select 
                                        fluid label='Department' 
                                        options={this.state.optionDepartment} 
                                        placeholder='Department'  
                                        value={this.state.department}
                                        onChange={(event, {value})=>{this.handleOnChangeSelect('department', value)}}
                                    />
                                    <Form.Select 
                                        fluid label='Division' 
                                        options={this.state.optionDivision} 
                                        placeholder='Division'  
                                        value={this.state.division}
                                        onChange={(event, {value})=>{this.handleOnChangeSelect('division', value)}}
                                    />
                                    <Button 
                                        color='blue'
                                        type='submit'
                                        onClick={this.register}
                                        disabled={
                                            !this.state.registerEmployeeID 
                                            || !this.state.nickname
                                            || !this.state.fullname
                                            || !this.state.company
                                            || !this.state.branch
                                            || !this.state.department
                                            || !this.state.division
                                        }
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
    isLogin       : state.user.isLogin,
});

const mapDispatchToProps = (dispatch) => ({
    loginDispatch: (req,res,err) => dispatch(actions.user.api.loginUser(req,res,err)),
    registerDispatch: (req,res,err) => dispatch(actions.user.api.registerUser(req,res,err)),
});
export default connect(mapStateToProps,mapDispatchToProps)(Login);