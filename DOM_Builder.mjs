import {createNewElem} from './Element-Creator.mjs'

const box = {elem: document.querySelector('.block'), cp: 6, cr: 0, rotating: false};

function buildSide(orien) {
  const {transZ1, transZ2} = setTransVal(orien);
  const trVal = `translateZ(${transZ1}vh) rotateX(${orien}deg) translateZ(${transZ2}vh`;
  const se = createNewElem('div', box.elem, [{prop: 'style', subprop: 'position', val: 'absolute'},
                                            {prop: 'style', subprop: 'width', val: '100vw'},
                                            {prop: 'style', subprop: 'height', val: '100vh'},
                                            {prop: 'style', subprop: 'backgroundColor', val: 'red'},
                                            {prop: 'style', subprop: 'transform', val: trVal}]);
  return {se};
}
function buildCaps(orien) {
  let pntDir = 'left';
  if (orien === -90) {pntDir = 'right';}
  const trVal = `translateZ(-50vh) rotateY(${orien}deg) translateZ(-50vw)`;
  const se = createNewElem('div', box.elem, [{prop: 'style', subprop: 'position', val: 'absolute'},
                                            {prop: 'style', subprop: pntDir, val: 'calc(50vw - 50vh)'},
                                            {prop: 'style', subprop: 'width', val: '100vh'},
                                            {prop: 'style', subprop: 'height', val: '100vh'},
                                            {prop: 'style', subprop: 'backgroundColor', val: 'red'},
                                            {prop: 'style', subprop: 'transform', val: trVal}]);
  return {se};
}
function buildFace(scList, orien, sideSpot) {
  const {transZ1, transZ2} = setTransVal(orien);
  const trVal = `translateZ(${transZ1}vh) rotateX(${orien}deg) translateZ(${transZ2}vh)`;
  const se = createNewElem('div', box.elem, [{prop: 'style', subprop: 'display', val: 'none'},
                                            {prop: 'style', subprop: 'position', val: 'absolute'},
                                            {prop: 'style', subprop: 'width', val: '100vw'},
                                            {prop: 'style', subprop: 'height', val: '100vh'},
                                            {prop: 'style', subprop: 'backfaceVisibility', val: 'hidden'},
                                            {prop: 'style', subprop: 'backgroundColor', val: 'red'},
                                            {prop: 'style', subprop: 'transform', val: trVal}]);
  const nbpw = createNewElem('div', se, [{prop: 'style', subprop: 'display', val: 'flex'},
                                        {prop: 'style', subprop: 'justifyContent', val: 'center'},
                                        {prop: 'style', subprop: 'height', val: '10vh'}]);
  let temp = null;
  if (sideSpot !== 'start') {
    temp = createNewElem('button', nbpw, [{prop: 'type', val: 'button'},
                                          {prop: 'style', subprop: 'width', val: '20vh'},
                                          {prop: 'style', subprop: 'height', val: '10vh'}], 'Previous');
  }
  const nbp = temp;
  const spw = createNewElem('div', se, [{prop: 'style', subprop: 'display', val: 'grid'},
                                        {prop: 'style', subprop: 'gridTemplateColumns', val: 'repeat(2,1fr)'},
                                        {prop: 'style', subprop: 'gridAutoRows', val: '40vh'},
                                        {prop: 'style', subprop: 'align-items', val: 'center'},
                                        {prop: 'style', subprop: 'justify-items', val: 'center'}]);
  const spa = [];
  for (let sc of scList) {
    spa.push(createNewElem('div', spw, sc));
  }
  temp = null;
  const nbnw = createNewElem('div', se, [{prop: 'style', subprop: 'display', val: 'flex'},
                                        {prop: 'style', subprop: 'justifyContent', val: 'center'},
                                        {prop: 'style', subprop: 'height', val: '10vh'}]);
  if (sideSpot !== 'end') {
    temp = createNewElem('button', nbnw, [{prop: 'type', val: 'button'},
                                          {prop: 'style', subprop: 'width', val: '20vh'},
                                          {prop: 'style', subprop: 'height', val: '10vh'}], 'Next');
  }
  const nbn = temp;
  return {se, nbpw, nbp, spw, spa, nbnw, nbn};
}
function setTransVal(orien) {
  let transZ1 = -50, transZ2 = 50;
  if (orien === 0) {transZ2 = transZ1 = 0;}
  else if (orien === -180) {
    transZ1 = 0;
    transZ2 = 100;
  }
  return {transZ1, transZ2};
}

export {box, buildSide, buildCaps, buildFace};
