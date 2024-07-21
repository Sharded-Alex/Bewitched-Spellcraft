import {Vector3} from "./VectorMath/index.js";

function crossProduct(a, b) {
  return {
      x:a.y * b.z - a.z * b.y, 
      y:-(a.z * b.x - a.x * b.z),
      z:a.x * b.y - a.y * b.x};
}

export function localizePos(location, viewDirection, vector) {
  let zVec = viewDirection;
  let xVec = Vector3.normalize(new Vector3(zVec.z, 0, -zVec.x));
  let yVec = crossProduct(zVec, xVec);
  
  let xResult = Vector3.scale(xVec, vector.x);
  let yResult = Vector3.scale(yVec, vector.y);
  let zResult = Vector3.scale(zVec, vector.z);
  
  let newLocation = {
    "x": xResult.x + yResult.x + zResult.x,
    "y": xResult.y + yResult.y + zResult.y,
    "z": xResult.z + yResult.z + zResult.z
  };
  return newLocation;
}