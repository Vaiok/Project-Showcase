import {box, buildSide, buildCaps, buildFace} from './DOM_Builder.mjs';

const scArr = ['entry1', 'entry2', 'entry3', 'entry4', 'entry5', 'entry6', 'entry7', 'entry8', 'entry9', 'entry10',
              'entry11', 'entry12', 'entry13', 'entry14', 'entry15', 'entry16', 'entry17', 'entry18', 'entry19',
              'entry20', 'entry21', 'entry22', 'entry23', 'entry24', 'entry25', 'entry26', 'entry27', 'entry28'];
let pps = 4, orien = 0;
const elemArr = [];

for (let i = 0; i > -300; i -= 90) {elemArr.push(buildSide(i));}
elemArr.push(buildCaps(-90));
elemArr.push(buildCaps(90));
for (let scArrPnt = 0; scArrPnt < scArr.length; scArrPnt += pps) {
  let sideSpot = 'middle';
  if (scArrPnt === 0) {sideSpot = 'start';}
  else if (scArrPnt + pps >= scArr.length) {sideSpot = 'end';}
  if (scArr.length >= scArrPnt+pps) {
    elemArr.push(buildFace(scArr.slice(scArrPnt, scArrPnt+pps), orien, sideSpot));
  }
  else {elemArr.push(buildFace(scArr.slice(scArrPnt, scArr.length), orien, sideSpot));}
  orien -= 90;
  if (orien <= -360) {orien += 360;}
}

elemArr[6].se.style.display = 'block';
elemArr[7].se.style.display = 'block';
box.elem.addEventListener('transitionend', function() {box.rotating = false;});
for (let sb of elemArr) {
  if (sb.nbp) {sb.nbp.addEventListener('click', function() {buttonClick(-90, -1, 2)});}
  if (sb.nbn) {sb.nbn.addEventListener('click', function() {buttonClick(90, 1, -2)});}
}
function buttonClick(ri, ps, ph) {
  if (!box.rotating) {
    box.rotating = true;
    box.cr += ri;
    box.cp += ps;
    if (elemArr[box.cp+ps] && elemArr[box.cp+ps].spw) {elemArr[box.cp+ps].se.style.display = 'block';}
    if (elemArr[box.cp+ph] && elemArr[box.cp+ph].spw) {elemArr[box.cp+ph].se.style.display = 'none';}
    box.elem.style.transformOrigin = 'center 50vh -50vh';
    box.elem.style.transform = `rotateX(${box.cr}deg)`;
  }
}

/*
let transLeft = false, transRight = false, transUp = false, transDown = false,
    transForward = false, transBackward = false, rotLeft = false, rotRight = false,
    rotUp = false, rotDown = false, rollLeft = false, rollRight = false;
let xPos = 0, yPos = 0, zPos = 0, xRot = 0, yRot = 0, zRot = 0;
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
function keyDown(e) {
  setKeys(e, true)
}
function keyUp(e) {
  setKeys(e, false)
}
function setKeys(e, val) {
  if (e.key === 'a') {transLeft = val;}
  if (e.key === 'd') {transRight = val;}
  if (e.key === '2') {transUp = val;}
  if (e.key === 'x') {transDown = val;}
  if (e.key === 'w') {transForward = val;}
  if (e.key === 's') {transBackward = val;}
  if (e.key === 'q') {rotLeft = val;}
  if (e.key === 'e') {rotRight = val;}
  if (e.key === 'r') {rotUp = val;}
  if (e.key === 'f') {rotDown = val;}
  if (e.key === 'z') {rollLeft = val;}
  if (e.key === 'c') {rollRight = val;}
}
window.requestAnimationFrame(controlLoop);
function controlLoop(timeStamp) {
  window.requestAnimationFrame(controlLoop);
  if (transLeft) {xPos--;}
  if (transRight) {xPos++;}
  if (transUp) {yPos--;}
  if (transDown) {yPos++;}
  if (transForward) {zPos--;}
  if (transBackward) {zPos++;}
  if (rotLeft) {yRot++;}
  if (rotRight) {yRot--;}
  if (rotUp) {xRot--;}
  if (rotDown) {xRot++;}
  if (rollLeft) {zRot--;}
  if (rollRight) {zRot++;}
  box.elem.style.transformOrigin = 'center 50vh -50vh';
  box.elem.style.transform = `translateX(${xPos}vmin) translateY(${yPos}vmin) translateZ(${zPos}vmin)
                          rotateX(${xRot}deg) rotateY(${yRot}deg) rotateZ(${zRot}deg)`;
}
*/
