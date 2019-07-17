import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    DynamicImport,
    Loader as LoadingAnimation,
} from '../../components'

class Content extends Component {
    render() {
        return (
            <div>
                {this.props.isLogin ?<Profile/>:<Login/>}
            </div>
        );
    }
}

const Profile = (props) => (
    <DynamicImport load={() => import('./components/Profile')}>
      {(Component) => Component === null
        ? <LoadingAnimation />
        : <Component {...props} />}
    </DynamicImport>
)
const Login = (props) => (
    <DynamicImport load={() => import('./components/Login')}>
      {(Component) => Component === null
        ? <LoadingAnimation />
        : <Component {...props} />}
    </DynamicImport>
)

const mapStateToProps = (state) => ({
    isLogin       : state.user.isLogin,
});
const App = connect(mapStateToProps,null)(Content);

const User = () => {
    return (
        <div>
            <Container contents={<App />}/>
        </div>
    )
}
export default User;