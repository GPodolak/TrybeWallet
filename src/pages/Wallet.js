import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

Wallet.propTypes = { expenses: PropTypes.arrayOf(PropTypes.string) }.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
