import React from 'react';
import logo from './logo.svg';
import ContentOts from './components/caculateMatrix';
import './App.css';
import { Matrix } from 'javascript-algebra';
import matrix from 'matrix-js';






function App() {
  //перевод массив элементов в строку сложения

  // const test = ['a15', 'a51', 'a14', 'a11', 'a12', 'a11', 'a11', 'a14'];
  // sumEquation(test);

  //расчет ОТС любого порядка

  // const a = fillMatrix2(rang);
  // const A = matrix(a);
  // console.log('A is', A());

  // let prevRes = A;
  // for (let i = 0; i < rang; i++) {
  //   prevRes = calculateDiff(prevRes, i + 1);
  //   let matrix = prevRes();
  //   let newMatrix = [];
  //   for(let row of matrix){
  //     let newRow = [];
  //     for(let elem of row){
  //       let newElem = elem.split('a').join('|a').split('|');
  //       newElem.splice(0,1);
  //       newElem = sumEquation(newElem);
  //       debugger
  //       newRow.push(newElem);
  //     }
  //     newMatrix.push(newRow);
  //   }
  //   console.log(`Matrix OTS ${i+1} String is`, newMatrix)
  // }

  return (
    <div className="App">
      <header className="App-header">
        <ContentOts></ContentOts>
      </header>
    </div>
  );
}

export default App;
