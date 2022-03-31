import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({ [name]: value }, this.loginValidate);
  }

  validatePassword = () => {
    const { password } = this.state;
    const minPasswordLength = 6;
    return password.length < minPasswordLength;
  }

  validateEmail = () => {
    const { email } = this.state;
    const regxEmail = /\S+@\S+\.\S+/;
    return !regxEmail.test(email);
  }

  loginValidate = () => {
    const isDisabled = this.validateEmail() || this.validatePassword();
    this.setState({ isDisabled });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { history, setEmail } = this.props;
    setEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Email
          <input
            value={ email }
            name="email"
            onChange={ this.handleChange }
            data-testid="email-input"
            id="email"
            type="text"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            value={ password }
            onChange={ this.handleChange }
            name="password"
            data-testid="password-input"
            id="password"
            type="password"
          />
        </label>
        <button
          type="submit"
          disabled={ isDisabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(loginUser(email)),
});

Login.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
  setEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
