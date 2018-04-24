import {connect} from 'react-redux';
import {AuthForm} from './index';
import {auth} from '../store/userStore';

/*///
 CONTAINERS
*////
const mapStateLogin = state => ({
  displayName: 'log In',
  authFunction: 'login',
  error: state.userStore.error
});

const mapStateSignup = state => ({
  displayName: 'Sign Up',
  authFunction: 'signup',
  error: state.userStore.error
});

const mapDispatch = ({auth});

export const Login = connect(mapStateLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapStateSignup, mapDispatch)(AuthForm);
