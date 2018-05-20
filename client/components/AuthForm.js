import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import {stylesAuthForm as styles} from '../styling/inlineStyles';

/*///
 COMPONENT
*////
class AuthForm extends React.Component {

  constructor(props) {
    super(props);
    this.initialState = {
        name: '',
        email: '',
        password: '',
        nameTouched: false,
        emailTouched: false,
        passwordTouched: false,
        nameErrorText: '',
        emailErrorText: '',
        passwordErrorText: '',
        submitErrorText: '',
    };
    this.state = this.initialState;
    this.clearFormState = this.clearFormState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAuthFormSubmit = this.handleAuthFormSubmit.bind(this);
    this.handleAuthFormClose = this.handleAuthFormClose.bind(this);
    this.handleSubmitError = this.handleSubmitError.bind(this);
  }

  clearFormState() {
    this.setState(this.initialState);
  }

  handleChange(key) {
    return (evt) => {
      this.setState({ [key]: evt.target.value, [`${key}Touched`]: true });
      if (this.state[`${key}Touched`] && evt.target.value === '') {
        this.setState({ [`${key}ErrorText`]: `${key} field is required` });
      } else if (evt.target.value) {
        this.setState({ [`${key}ErrorText`]: '' });
      }
    };
  }

  handleAuthFormSubmit(evt) {
    const { authFunction } = this.props;
    const { email, password, name } = this.state;
    evt.preventDefault();

    if (authFunction === 'login') {
      if (!email || !password) {
        return this.setState({
          emailErrorText: !email ? 'email field is required' : '',
          passwordErrorText: !password ? 'password field is required' : '',
          submitErrorText: '',
        });
      }
    } else if (authFunction === 'signup') {
      if (!email || !password || !name) {
        return this.setState({
          emailErrorText: !email ? 'email field is required' : '',
          passwordErrorText: !password ? 'password field is required' : '',
          nameErrorText: !name ? 'name field is required' : '',
          submitErrorText: '',
        });
      }
    }

    this.props.auth(authFunction, email, password, name)
      .then(res => {
        if (res.user && res.user.error) {
          this.handleSubmitError(res.user.error);
        } else {
          this.handleAuthFormClose();
        }
      })
      .catch(err => {
        this.handleSubmitError(err);
      });
  }

  handleAuthFormClose() {
    this.clearFormState();
    this.props.toggleOpenState(this.props.isOpen);
  }

  handleSubmitError(err) {
    if (err) {
      let submitErrorText =
      (err.response && err.response.data) ||
      `There was a problem with your ${this.props.displayName.toLowerCase()}. Please try again.`;
      this.setState(Object.assign({}, this.initialState, { submitErrorText }));
    }
  }

  render() {
    const { isOpen, authFunction } = this.props;
    const { name, email, password, nameErrorText, emailErrorText, passwordErrorText, submitErrorText } = this.state;

    const actions = [
      <FlatButton
        key="Submit"
        label="Submit"
        type="submit"
        onClick={this.handleAuthFormSubmit}
        style={styles.flatButton}
        className="auth-form-button"
        hoverColor="rgba(0, 0, 0, 0.4)"
        rippleColor="yellow"
      />,
      <FlatButton
        key="Cancel"
        label="Cancel"
        type="button"
        onClick={this.handleAuthFormClose}
        style={styles.flatButtonNoBorder}
        className="auth-form-button"
        hoverColor="transparent"
        rippleColor="yellow"
      />,
    ];

    return (
      <Dialog
        title={authFunction === 'login' ? 'Welcome Back!' : 'Welcome!'}
        titleStyle={styles.authFormTitle}
        bodyStyle={styles.authFormBody}
        actionsContainerStyle={styles.authFormActionsContainer}
        actions={actions}
        modal={false}
        autoScrollBodyContent
        open={isOpen}
        onRequestClose={this.handleAuthFormClose}
      >
        <div className="login-signup-container">
          <form onSubmit={this.handleAuthFormSubmit}>
            <List>
              <div>
              { submitErrorText ?
                <p className="main-error-message">{submitErrorText}</p>
                :
                ( authFunction === 'login' ?
                  <p>Log in to access your account:</p>
                  : <p>Sign up to create a new account:</p>
                )
              }
              </div>
            { authFunction === 'signup' ?
              <div>
                <ListItem disabled={true}>
                  <TextField
                    floatingLabelText="Name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={this.handleChange('name')}
                    required
                    errorText={nameErrorText}
                    errorStyle={
                      nameErrorText ? styles.errorVisible : styles.errorHidden
                    }
                    underlineFocusStyle={{borderColor: '#c2a661'}}
                    floatingLabelStyle={
                      nameErrorText ? {color: '#f44336'} : {color: '#c2a661'}
                    }
                    floatingLabelFocusStyle={
                      nameErrorText ? {color: '#f44336'} : {color: '#c2a661'}
                    }
                  />
                </ListItem>
                <Divider />
              </div>
              : null
            }
              <ListItem disabled={true}>
                <TextField
                  floatingLabelText="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={this.handleChange('email')}
                  required
                  errorText={emailErrorText}
                  errorStyle={
                    emailErrorText ? styles.errorVisible : styles.errorHidden
                  }
                  underlineFocusStyle={{borderColor: '#c2a661'}}
                  floatingLabelStyle={
                    emailErrorText ? {color: '#f44336'} : {color: '#c2a661'}
                  }
                  floatingLabelFocusStyle={
                    emailErrorText ? {color: '#f44336'} : {color: '#c2a661'}
                  }
                />
              </ListItem>
              <Divider />
              <ListItem disabled={true}>
                <TextField
                  floatingLabelText="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={this.handleChange('password')}
                  required
                  errorText={passwordErrorText}
                  errorStyle={
                    passwordErrorText ? styles.errorVisible : styles.errorHidden
                  }
                  underlineFocusStyle={{borderColor: '#c2a661'}}
                  floatingLabelStyle={
                    passwordErrorText ? {color: '#f44336'} : {color: '#c2a661'}
                  }
                  floatingLabelFocusStyle={
                    passwordErrorText ? {color: '#f44336'} : {color: '#c2a661'}
                  }
                />
              </ListItem>
            </List>
          </form>
        </div>
      </Dialog>
    );
  }
}

export default AuthForm;
