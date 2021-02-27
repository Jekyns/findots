const compareElem = (elem, Eq) => {
  let countEquivalent = 0;
  for (let elems = 0; elems < Eq.length; elems++) {
    let equivalent = false;
    for (let i = 0; i < elem.length; i++) {//перебираем всю строку одного из элементов
    let equivalentI = [];
      for (let j = 0; j < Eq[elems].length; j++) { // перебираем всю строку элемента из массива
        if (elem[i] === Eq[elems]) {
          for(let g of equivalentI){//если мы уже брали этот символ
            if(g === elems){
              continue;
            }
          }
          equivalent = true;
          equivalentI.push(elems);
          break
        }
        else{
          equivalent = false;
        }
      }
      if(equivalent === false){
        break;
      }
    }
        if(equivalent === true){
          countEquivalent++
          Eq.splice(elem, 1);
        }
        else{
          break;
        }
  }
  return countEquivalent;
}
const sumEquation = (Eq) => {
  const sum = {};
  for (let elem = 0; elem < Eq.length; elem++) {
    const elemForCompare = Eq[elem];
    Eq.splice(elem, 1);
    compareElem(elemForCompare, Eq);
  }
}