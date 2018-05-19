import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import styled, { keyframes } from 'styled-components';
import { line } from 'd3-shape';
import {
  scaleLinear
} from 'd3-scale';


class App extends Component {
  render() {


    const data = [[0, 100], [1, 120], [2, 90], [3, 95], [4, 110], [5, 95]];
    const x = scaleLinear().domain([0, 5]).range([0, 500])
    const y = scaleLinear().domain([0, 200]).range([0, 300]);

    const lineGen = line()
      .x(function (d, i) {
        return x(d[0])
      })
      .y(function (d) {
        return y(d[1])
      });

    const SparkLine = styled.path`
            fill: none;
            stroke: #3498db;
            stroke-width: 2;`;


    const LineAnimationGenerator = () => data.map((d, i) => {
      return Math.round((i / (data.length - 1)) * 100) + "%" + " { transform: translate(" + x(d[0]) + "px," + y(d[1]) + "px);} ";
    }).reduce((acc, curr) => { return acc + curr }, "")

    const LineAnimator = keyframes`${LineAnimationGenerator()}`;

    const AnimatedCircle = styled.circle`
        fill: blue;
        animation: ${LineAnimator} 2s linear forwards;
    `;

    console.log(LineAnimationGenerator())

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <svg width="500" height="300" >
          <SparkLine d={lineGen(data)} />
          <AnimatedCircle r="5" />
        </svg>

      </div>
    );
  }
}

export default App;
