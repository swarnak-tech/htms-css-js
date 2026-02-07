import React, { Component, createRef } from "react";
import io from "socket.io-client";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const socket = io("http://localhost:5000");

class StockDashboard extends Component {
  constructor() {
    super();

    this.state = {
      stockSymbol: "",
      stockPrice: 0,
      prices: [],
      theme: "light"
    };

    this.previousSearchRef = createRef();
  }

  componentDidMount() {
    socket.on("stockUpdate", (price) => {
      this.setState((prevState) => ({
        stockPrice: price,
        prices: [...prevState.prices, price].slice(-10)
      }));
    });
  }

  handleChange = (e) => {
    const symbol = e.target.value.toUpperCase();
    this.setState({ stockSymbol: symbol });

    if (this.previousSearchRef.current && symbol.length === 1) {
      this.previousSearchRef.current.value += symbol + "\n";
    }
  };

  toggleTheme = () => {
    this.setState({
      theme: this.state.theme === "light" ? "dark" : "light"
    });
  };

  render() {
    const isDark = this.state.theme === "dark";

    const chartData = {
      labels: this.state.prices.map((_, i) => i + 1),
      datasets: [
        {
          label: "Stock Price Trend",
          data: this.state.prices,
          borderColor: "green",
          tension: 0.3
        }
      ]
    };

    return (
      <div className={`container mt-5 ${isDark ? "bg-dark text-white" : ""}`}>
        <div className="card p-4 shadow">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-primary">Stock Market Dashboard</h2>
            <button
              className="btn btn-secondary"
              onClick={this.toggleTheme}
            >
              Toggle Theme
            </button>
          </div>

          {/* Controlled Component */}
          <label className="form-label fw-bold mt-3">
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
            readOnly
          ></textarea>

          {/* Live Price */}
          <div className="card bg-light p-3 text-center mb-4">
            <h5>Current Stock Price</h5>
            <p className="fs-3 text-success">
              ₹ {this.state.stockPrice}
            </p>
          </div>

          {/* Chart */}
          <div className="card p-3">
            <Line data={chartData} />
          </div>
        </div>
      </div>
    );
  }
}

export default StockDashboard;
