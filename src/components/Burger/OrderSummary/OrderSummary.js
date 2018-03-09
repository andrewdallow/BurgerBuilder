import React, { Component, Fragment } from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // This could be a functional Component, dosn't have
  // to be a class.
  componentWillUpdate() {
    console.log('[OrderSummary] will update.');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
        {this.props.ingredients[igKey]}
      </li>
    ));
    return (
      <Fragment>
        <h3>Your Order</h3>
        <p>A delicous Burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: ${this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Fragment>
    );
  }
}

export default OrderSummary;
