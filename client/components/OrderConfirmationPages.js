import React from 'react';
import {connect} from 'react-redux';
import {BackToBrowseButton} from './index';

/*///
 COMPONENT
*////
const OrderConfirmationPage = (props) => {
  const {displayMessage} = props;

  return (
    <div>
      <h3 className="placeholder-message">{displayMessage}</h3>
      <div className="back-button-container">
        <BackToBrowseButton />
      </div>
    </div>
  );
};

/*///
 CONTAINERS
*////
const mapStateOrderSuccess = state => ({
  displayMessage: 'Thanks for your purchase! We are happy to serve you.',
});

const mapStateOrderError = state => ({
  displayMessage: 'Sorry! There was a problem with processing your order. Please try again.',
});

const mapDispatch = null;

export const OrderSuccessPage = connect(mapStateOrderSuccess, mapDispatch)(OrderConfirmationPage);
export const OrderErrorPage = connect(mapStateOrderError, mapDispatch)(OrderConfirmationPage);
