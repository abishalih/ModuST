import 'semantic-ui-css/semantic.min.css'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {
    Dropdown,
    Grid,
    // Label,
    Icon,
    Menu,
    Segment,
    Sidebar,
} from 'semantic-ui-react'
import '../../styles/Container.css'
import actions from '../../actions';
import { connect } from 'react-redux';
const iconUI = {
    executive   : 'users',   
    ticket      : 'ticket',   
    approval    : 'clipboard check',   
    helpdesk    : 'location arrow',   
    warehouse   : 'warehouse',   
    delivery    : 'shipping fast',   
    procurement : 'shop',   
    finance     : 'payment',   
    accounting  : 'currency',   
    master      : 'universal access',   
    user        : 'user',   
    admin       : 'dashboard',   
}
const VerticalSidebar = ({ listMenu, animation, direction, visible, toggle }) => (
    <Sidebar
        as={Menu}
        animation={animation}
        direction={direction}
        icon='labeled'
        color='blue'
        inverted
        vertical
        visible={visible}
        width='thin'
    >
        <Menu.Item header as={Link} to='/' onClick={toggle}>
            <Icon name='list layout'/>
            Menu
        </Menu.Item>
        {
            listMenu.lengh>0 ?
            listMenu.map((menu, key)=>{
            return (
                <Menu.Item as={Link} to={menu.link} onClick={toggle} key={key}>
                    <Grid>
                        <Grid.Column> <Icon name={iconUI[menu.link]}/> </Grid.Column>
                        <Grid.Column> {menu.name} </Grid.Column>
                    </Grid>
                </Menu.Item>
            )}):
            <Menu.Item as={Link} to='/ticket' onClick={toggle}>
                    <Grid>
                        <Grid.Column> <Icon name='ticket' /> </Grid.Column>
                        <Grid.Column> Ticket </Grid.Column>
                    </Grid>
            </Menu.Item>
            <Menu.Item as={Link} to='/user' onClick={toggle}>
            <Grid>
                <Grid.Column> <Icon name='user' /> </Grid.Column>
                <Grid.Column> User </Grid.Column>
            </Grid>
    </Menu.Item>
        }
    </Sidebar>
)

VerticalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
}

class Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            animation: 'slide out',
            direction: 'left',
            dimmed: true,
            visible: false,
        }
    }

    componentDidMount(){
        document.title = "Ticketing System"
    }
    
    handleAnimationChange = animation => () => this.setState(prevState => ({ animation, visible: !prevState.visible }))
    logout = () =>{
        this.props.logoutDispatch();
    }
    render() {
        const { animation, dimmed, direction, visible } = this.state
        return (
            <div>
                <Menu inverted color='blue' attached='top'>
                    <Menu.Item onClick={this.handleAnimationChange('slide out')}>
                        <Icon name='list' />
                    </Menu.Item>
                    <Menu.Item header>
                        <Icon name='ticket'/>
                        Ticketing System
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Dropdown text={this.props.userInfo.nickName} labeled pointing className='link item'>
                            <Dropdown.Menu>
                                { 
                                    this.props.isLogin ? 
                                    <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item> :
                                    <Dropdown.Item as={Link} to='/user'>Login</Dropdown.Item>
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Menu>

                <Sidebar.Pushable as={Segment} style={{marginTop:'0', border:'none', borderRadius:'0'}}>
                    <VerticalSidebar 
                        listMenu={this.props.listMenu} 
                        animation={animation} 
                        direction={direction} 
                        visible={visible} 
                        toggle={this.handleAnimationChange('slide out')} 
                    />
                    <Sidebar.Pusher dimmed={dimmed && visible}>
                    <div className="container">
                        {this.props.contents}
                    </div>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}   

const mapStateToProps = (state) => ({
    isLogin       : state.user.isLogin,
    userInfo      : state.user.userInfo,
    listMenu      : state.user.listMenu,
});

const mapDispatchToProps = (dispatch) => ({
    logoutDispatch: (res,err) => dispatch(actions.user.api.logoutUser(res,err)),
});
export default connect(mapStateToProps,mapDispatchToProps)(Container)
