import React, { Component } from 'react';
import matrix from 'matrix-js';
import { fillD, fillMatrix2, calculateDiff, sumEquation } from '../utils/MatrixOperations';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ShowMatrix from './ShowMatrix';

export default class ContentOts extends Component {
    constructor(props) {
        super(props);
        // const D = matrix(fillD(rang));
        // const A = fillMatrix2(rang);
        this.state = {
            order: 6,
            iterations: 6,
            allMatrixs: [],
        };
    }
    componentDidMount() {}
    onChangeInput = (e) => {
        this.setState({ order: e.currentTarget.value });
    }
    onChangeIterations = (e) => {
        this.setState({ iterations: e.currentTarget.value });
    }

    calculateOTS = () => {
        const {order,iterations} = this.state
        const D = matrix(fillD(order));
        console.log('D is', D());
        const A = fillMatrix2(order);
        const Dtrans = matrix(D.trans());
        const allMatrixs = [];
        allMatrixs.push(A());
        // this.setState({ order: e.currentTarget.value });
        let prevRes = A;
        for (let i = 0; i < iterations; i++) {
            prevRes = calculateDiff(prevRes, Dtrans, D, i + 1);
            let matrix = prevRes();
            let newMatrix = [];
            for (let row of matrix) {
                let newRow = [];
                for (let elem of row) {
                    let newElem = elem.split('a').join('|a').split('|');
                    newElem.splice(0, 1);
                    newElem = sumEquation(newElem);
                    newRow.push(newElem);
                }
                newMatrix.push(newRow);
            }
            console.log(`Matrix OTS ${i + 1} String is`, newMatrix)
            allMatrixs.push(newMatrix);
        }

        this.setState({allMatrixs: allMatrixs});
    }

    render() {
        const {order,iterations, allMatrixs} = this.state;
        return (
            <div>Enter order:
            <TextField
                    required={true}
                    className="order"
                    value={order}
                    margin="dense"
                    label={`Enter order OTS`}
                    onChange={(e) => { this.onChangeInput(e); }}
                />
                Enter iteration count:
            <TextField
                    required={true}
                    className="iterations"
                    value={iterations}
                    margin="dense"
                    label={`Enter iteration count`}
                    onChange={(e) => { this.onChangeIterations(e); }}
                />
                
                <Button onClick={this.calculateOTS} color="primary">
                    Calculate
            </Button>
            {allMatrixs.map((matrix, i)=>(
                <ShowMatrix matrix={matrix} i={i}/>
            ))}
            </div>
        )
    }
}