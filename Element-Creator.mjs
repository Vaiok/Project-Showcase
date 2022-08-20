function createNewElem(ne, pe, props = undefined, cont = undefined) {
  let elem;
  if (typeof ne === 'string' && typeof pe === 'object') {elem = crApp(ne, pe, 'createElement');}
  else if (typeof ne === 'object' && typeof pe === 'string') {elem = crApp(pe, ne, 'createElement');}
  else {
    console.error(`First 2 arguments of createNewElem() must be a string and an object.`);
    return null;
  }
  if (typeof props === 'object' && typeof cont === 'string') {
    appProps(props, elem);
    crApp(cont, elem, 'createTextNode');
  }
  else if (typeof cont === 'object' && typeof props === 'string') {
    appProps(cont, elem);
    crApp(props, elem, 'createTextNode');
  }
  else if (typeof props === 'object') {appProps(props, elem);}
  else if (typeof props === 'string') {crApp(props, elem, 'createTextNode');}
  return elem;
}
function crApp(ne, pe, crFunc) {
  const elem = document[crFunc](ne);
  pe.appendChild(elem);
  return elem;
}
function appProps(props, elem) {
  for (let {prop, subprop = undefined, val} of props) {
    if (prop === 'style') {elem[prop][subprop] = val;}
    else {elem[prop] = val;}
  }
}

export {createNewElem};
