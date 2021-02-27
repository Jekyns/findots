import React, { Component } from 'react';
import matrix from 'matrix-js';
import { fillD, fillMatrix2, calculateDiff, sumEquation } from '../utils/MatrixOperations';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components'


export default class ShowMatrix extends Component {
  constructor(props) {
    super(props);
    // const D = matrix(fillD(rang));
    // const A = fillMatrix2(rang);
    this.state = {
      order: 6,
      allMatrixs: [],
    };
  }


  componentDidMount() {

  }

  onChangeInput = (e) => {
    this.setState({ order: e.currentTarget.value });
  }

  showEquationElem = (elem, i, j) => {
    let newElem = [];
    if(i!=5 && j!=5){
      newElem.push(<>
        <span
         dangerouslySetInnerHTML={{__html: elem.replace(/a[0-9]+/gm, (...arg)=>{return `${arg[0][0]}<sub>${arg[0].slice(1,arg[0].length)}</sub>`})}}
        />
        K<sub>{i + 1}</sub>(x)K<sub>{j + 1}</sub>(x)+
        </>)
    }
    else{
      newElem.push(<>
      <span
       dangerouslySetInnerHTML={{__html: elem.replace(/a[0-9]+/gm, (...arg)=>{return `${arg[0][0]}<sub>${arg[0].slice(1,arg[0].length)}</sub>`})}}
      />
      K<sub>{i + 1}</sub>(x)K<sub>{j + 1}</sub>(x)
      </>)
    }
    return (newElem)
  }

  converToEquation = (matrix) => {
    const equation = [];
    matrix.map((row, i) => {
      row.map((elem, j) => {
        equation.push(this.showEquationElem(elem, i, j))
      })
    })
    return equation;
  }

showNameMatrixEquation = (order) => {
  let diffs = '';
  for(let i = 0;i<order;i++){
    diffs+='`';
  }
  return(<>A{diffs}</>)
}

  render() {
    const { matrix, i } = this.props;
    return (
      <div>
        <StyledMatrix>
          <TableWrapper>
            <TableName>
              A <sub>{i}</sub> =
            </TableName>
            <StyledTableContainer>
              <Table className={'matrix'} aria-label="simple table">
                <TableBody>
                  {matrix.map(row => (
                    <TableRow key={row.name}>
                      {row.map(elem => (
                        <TableCell dangerouslySetInnerHTML={{__html: elem.replace(/a[0-9]+/gm, (...arg)=>{return `${arg[0][0]}<sub>${arg[0].slice(1,arg[0].length)}</sub>`})}}>
                          {/* {elem.replace(/a[0-9]+/gm, (...arg)=>{return `${arg[0][0]}<sub>${arg[0].slice(1,arg[0].length)}</sub>`})} */}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          </TableWrapper>
        </StyledMatrix>
        <EquationWrapper>
        <span className="equation__name-span">{this.showNameMatrixEquation(i)} = </span>
        <span className="equation__element-span">{this.converToEquation(matrix)}</span>
        </EquationWrapper>

      </div>
    )
  }
}

const StyledMatrix = styled.div`
  margin: 45px;
  padding:20px;
  padding-left:100px;
`
const TableWrapper = styled.div`
  display:flex;
  justify-content: flex-start;
  align-items: center;
`
const TableName = styled.div`
color:#000;
margin-right:20px;
`
const StyledTableContainer = styled(TableContainer)`
  width:75%;
  border-left: 2px solid #000;
  border-radius: 24px;
  border-right: 2px solid #000;
`
const EquationWrapper = styled.div`
  color:#000;
  width: 80%;
  word-break: break-word;
  font-size: 12px;
  display: flex;
  .equation__name-span{
    word-break: normal;
    width: 150px;
  }
`