/* eslint-env browser */

import React, { Component, Fragment } from 'react';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../containers/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BuurgerBuilder extends Component {
  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then((response) => {
        this.setState({ ingredients: response.data });
        this.updatePurchaseState(response.data);
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] - 1;
    if (updatedCount >= 0) {
      const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
      const updatedIngredients = {
        ...this.state.ingredients
      };

      updatedIngredients[type] = updatedCount;
      this.setState({
        totalPrice: newPrice,
        ingredients: updatedIngredients
      });
      this.updatePurchaseState(updatedIngredients);
    }
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert('You continued!');
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price,
      customer: {
        name: 'Andrew Dallow',
        address: {
          street: 'test street 1',
          zipCode: '458426',
          country: 'New Zealand'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };

    axios
      .post('/orders.json', order)
      .then((response) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients {"can't"} be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          totalPrice={this.state.totalPrice}
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disableInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default withErrorHandler(BuurgerBuilder, axios);
