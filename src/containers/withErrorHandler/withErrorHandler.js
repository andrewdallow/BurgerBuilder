import React, { Component, Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) =>
  class extends Component {
    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptors = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.request.eject(this.resInterceptors);
    }

    state = {
      error: null
    };

    errorConfirmedHandeler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Fragment>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandeler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };

export default withErrorHandler;
