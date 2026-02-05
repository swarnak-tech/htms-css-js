import React, { Component, createRef } from "react";
import io from "socket.io-client";

// Connect to backend
const socket = io("http://localhost:5000");

class StockDashboard extends Component {
  constructor() {
    super();

    // Controlled component state
    this.state = {
      stockSymbol: "",
      stockPrice: 0
    };

    // Uncontrolled component (previous searches)
    this.previousSearchRef = createRef();
  }

  // Lifecycle method – runs once
  componentDidMount() {
    socket.on("stockUpdate", (price) => {
      this.setState({ stockPrice: price });
    });
  }

  // Handle controlled input + store history
  handleChange = (e) => {
    const symbol = e.target.value.toUpperCase();
    this.setState({ stockSymbol: symbol });

    // Store previous searches (uncontrolled)
    if (this.previousSearchRef.current && symbol.length === 1) {
      this.previousSearchRef.current.value += symbol + "\n";
    }
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="card p-4 shadow">
          <h2 className="text-center text-primary mb-4">
            📈 Stock Market Dashboard
          </h2>

          {/* Controlled Component */}
          <label className="form-label fw-bold">
            Enter Stock Symbol
          </label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Eg: AAPL, TSLA"
            value={this.state.stockSymbol}
            onChange={this.handleChange}
          />

          {/* Uncontrolled Component */}
          <label className="form-label fw-bold">
            Previous Searches
          </label>
          <textarea
            ref={this.previousSearchRef}
            className="form-control mb-4"
            rows="4"
            placeholder="Your searched stock symbols will appear here"
            readOnly
          ></textarea>

          {/* Live Stock Price */}
          <div className="card bg-light p-3 text-center">
            <h5 className="fw-bold">Current Stock Price</h5>
            <p className="fs-3 text-success">
              ₹ {this.state.stockPrice}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default StockDashboard;
