import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {
    Dropdown,
    Menu,
    Icon,
    Label,
  } from 'semantic-ui-react'
class Header extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Menu inverted color='blue' attached='top'>
                <Menu.Item onClick={this.props.handleAnimationChange('slide out')}>
                    <Icon name='list' />
                </Menu.Item>
                <Menu.Item header>
                    <Icon name='cogs'/>
                    Ticketing System
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Dropdown text={this.props.nickname} labeled pointing className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to='/user_activity'>
                                <Label color='orange'>001</Label>
                                Activities
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to='/user_notification'>
                                <Label color='yellow'>100</Label>
                                Notification
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item as={Link} to='/user_profile'>Profile User</Dropdown.Item>
                            <Dropdown.Item as={Link} to='/login'>Login</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
        )
    }
}
export default Header;