import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    const { error, errorInfo } = this.state;
    if (error) {
      return (
        <div>
          <h2>Oops ! Something went wrong </h2>
          <p>{error && error.toString()}</p>
          <br />
          <p>{errorInfo.componentStack}</p>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}
