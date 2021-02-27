import matrix from 'matrix-js';
import { findNOD } from './NOD';

export function fillMatrix2(rang) {
    let filledMatrix = [];
    for (let i = 0; i < rang; i++) {
        let row = [];
        for (let j = 0; j < rang; j++) {
            row.push(`a${i + 1}${j + 1}`);
            // row.push(2);
        }
        filledMatrix.push(row);
    }
    return matrix(filledMatrix);
};

export function compareElems(a, b) {
    if (b === 0) {
        return null
    }
};
export function myMul(A, B, Dside) {
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
};

export function mySum(A, B) {
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
};

export function fillD(rang) {
    const matrix = [];
    for (let i = 0; i < rang; i++) {
        let row = [];
        let j = 0;
        if ((i + 1) == rang) {
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
};
export function calculateDiff(A, Dtrans, D, iteration) {
    // console.log('A is ', A());
    // console.log('D is ', D());
    // console.log('Dtrams is ', Dtrans());
    const leftSide = matrix(myMul(Dtrans, A, 'left'));
    const rightSide = matrix(myMul(A, D, 'right'));
    const res = matrix(mySum(leftSide, rightSide));
    // console.log(`on ${iteration} rightSide is`, rightSide());
    // console.log(`on ${iteration} leftSide is`, leftSide());
    console.log(`on ${iteration} res is`, res());
    return res;
};
export function compareElem(elem, Eq) {
    let countEquivalent = 0;
    if (Eq.length < 1) {
        return 0;
    }

    for (let elems = 0; elems < Eq.length; elems++) {// перебираем все элементры массива
        let equivalent = false;
        let equivalentI = [];
        for (let i = 0; i < elem.length; i++) {//перебираем всю строку одного из элементов
            for (let j = 0; j < Eq[elems].length; j++) { // перебираем всю строку элемента из массива
                if (elem[i] === Eq[elems][j]) {
                    let checkRepeat = false;//переменная отвечающая за повторный символ
                    for (let g of equivalentI) {//если мы уже брали этот символ
                        if (g === j) {
                            checkRepeat = true;
                            break
                        }
                    }
                    if (!checkRepeat) {
                        equivalent = true;
                        equivalentI.push(j);
                        break
                    }
                }
                else {
                    equivalent = false;
                }
            }
            if (equivalent === false) {
                break;
            }
        }
        equivalentI = [];
        if (equivalent === true) {
            countEquivalent++
            Eq.splice(elems, 1);
            elems--
        }
    }

    return countEquivalent;
};
export function converToString(obj) {
    let newStr = '';
    for (let key = 0; key < Object.keys(obj).length; key++) {
        if (key > 0) {
            if (Object.keys(obj)[key] > 1) {
                if (Object.values(obj)[key].length >= 2) {
                    newStr += `+${Object.keys(obj)[key]}(`
                }
                else {
                    newStr += `+${Object.keys(obj)[key]}`
                }
            }
        }
        else {
            if (Object.keys(obj)[key] > 1) {
                if (Object.values(obj)[key].length >= 2) {
                    newStr += `${Object.keys(obj)[key]}(`
                }
                else {
                    newStr += `${Object.keys(obj)[key]}`
                }

            }
        }
        for (let elem = 0; elem < Object.values(obj)[key].length; elem++) {
            if (elem > 0) {
                newStr += `+${Object.values(obj)[key][elem]}`
            }
            else {
                newStr += `${Object.values(obj)[key][elem]}`
            }
        }
        if (Object.keys(obj)[key] > 1) {
            if (Object.values(obj)[key].length >= 2) {
                newStr += `)`
            }
        }
    }
    return newStr;
};
// export function sumEquation(Eq) {
//     const sum = {};
//     let countElem = 0;
//     for (let elem = 0; elem < Eq.length;) {
//         const elemForCompare = Eq[elem];
//         Eq.splice(elem, 1);
//         countElem = compareElem(elemForCompare, Eq) + 1;
//         if (sum[countElem]) {
//             sum[countElem] = [...sum[countElem], elemForCompare]
//         }
//         else {
//             sum[countElem] = [elemForCompare]
//         }
//     }
//     if(sum[2] && sum[2].length>1){

//         debugger
//     }
//     const newStr = converToString(sum);
//     return newStr;
// }

export function sumEquation(Eq) {
    const sum = {};
    let countElem = 0;
    for (let elem = 0; elem < Eq.length;) {
        const elemForCompare = Eq[elem];
        Eq.splice(elem, 1);
        countElem = compareElem(elemForCompare, Eq) + 1;
        if (sum[countElem]) {
            sum[countElem] = [...sum[countElem], elemForCompare]
        }
        else {
            sum[countElem] = [elemForCompare]
        }
    }
    if (sum[2] && sum[2].length > 1) {
        debugger
    }
    let newStr = '';
    if (Object.keys(sum).length > 1) {
        const NODObject = findNOD(sum);
        if (NODObject.NOD > 1) {
            newStr += `${NODObject.NOD}(`
        }
        if(NODObject.newSum == undefined || NODObject.newSum == null){
            debugger
        }
        newStr += converToString(NODObject.newSum);
        if (NODObject.NOD > 1) {
            newStr += `)`
        }
    }else{
        newStr = converToString(sum);
    }
    return newStr;
}


