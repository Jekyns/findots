export function NOD () {
  for (var x = +arguments[0], i = 1; i < arguments.length; i++) {
    var y = +arguments[i];
    while (x && y) {
      x > y ? x %= y : y %= x;
    }
    x += y;
  }
  return x;
};
export function findNOD (obj) {
  const objNOD = NOD(...Object.keys(obj));// return NOD
  if(objNOD<=1){
    return {NOD: objNOD, newSum:obj};
  }
  const newSum = {};
  Object.keys(obj).map((value,i)=>{
    newSum[value/objNOD] = Object.values(obj)[i];
  })
  // const newObj = {[objNOD]:Object.values(obj)};
  return {NOD: objNOD, newSum};
}