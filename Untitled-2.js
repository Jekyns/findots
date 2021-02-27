import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Matrix } from 'javascript-algebra';
import matrix from 'matrix-js';

const fillMatrix2 = (rang) => {
  let matrix = [];
  for (let i = 0; i < rang; i++) {
    let row = [];
    for (let j = 0; j < rang; j++) {
      row.push(`a${i + 1}${j + 1}`);
      // row.push(2);
    }
    matrix.push(row);
  }
  return matrix
}

const compareElems = (a, b) => {
  if (b === 0) {
    return null
  }
}

const myMul = (A, B, Dside) => {
  const matrix = [];
  const rang = A.size()[0];
  console.log('rang is', rang);
  let row = [];
  for (let rowI = 0; rowI < rang; rowI++) {
    for (let colI = 0; colI < rang; colI++) {
      for (let j = 0; j < rang; j++) {
        const a = A(rowI)[j];
        const b = Dside !== 'left' ? B([], colI)[j] : B([], colI)[j][0];
        if (Dside === 'left') {
          if (a !== 0) {
            row.push(b);
          }
        }
        else {
          if (b[0] !== 0) {
            row.push(a);
          }
        }
      }
    }
    matrix.push(row);
    row = [];
  }
  return matrix;
}

const mySum = (A, B) => {
  const rang = A.size()[0];
  const newMatrix = [];
  for (let i = 0; i < rang; i++) {
    let row = [];
    for (let j = 0; j < rang; j++) {
      const newElem = A(i, j) + B(i, j);
      row.push(newElem);
    }
    newMatrix.push(row);
  }
  return newMatrix
}

const fillD = (rang) => {
  const matrix = [];
  for (let i = 0; i < rang; i++) {
    let row = [];
    let j = 0;
    if ((i + 1) === rang) {
      row.push(1)
      j++
    }
    for (j; j < rang; j++) {
      if (j === (i + 1)) {
        row.push(1);
      }
      else {
        row.push(0);
      }
    }
    j = 0;
    matrix.push(row);
    row = [];
  }
  console.log('D is', matrix);
  return matrix;
}




const rang = 6;
const D = matrix(fillD(rang));
const Dtrans = matrix(D.trans());
console.log('D trans is', Dtrans);

const calculateDiff = (A, iteration) => {
  const leftSide = matrix(myMul(Dtrans, A, 'left'));
  const rightSide = matrix(myMul(A, D, 'right'));
  const res = matrix(mySum(leftSide, rightSide));
  console.log(`on ${iteration} rightSide is`, rightSide());
  console.log(`on ${iteration} leftSide is`, leftSide());
  console.log(`on ${iteration} res is`, res());
  return res;
}

function App() {

  const a = fillMatrix2(rang);
  const A = matrix(a);
  console.log('A is', A());

  let prevRes = A;
  for (let i = 0; i < rang; i++) {
    prevRes = calculateDiff(prevRes, i + 1);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
