import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { userEmail } = this.props;
    return (
      <div>
        TrybeWallet
        <p data-testid="email-field">{userEmail}</p>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Wallet.propType = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
