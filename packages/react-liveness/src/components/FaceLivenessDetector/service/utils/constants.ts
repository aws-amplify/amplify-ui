// Face distance is calculated as pupilDistance / ovalWidth.
// The further away you are from the camera the distance between your pupils will decrease, thus lowering the threshold values.
// These FACE_DISTNACE_THRESHOLD values are determined by the science team and should only be changed with their approval.
// We want to ensure at the start of a  check that the user's pupilDistance/ovalWidth is below FACE_DISTANCE_THRESHOLD to ensure that they are starting
//  a certain distance away from the camera.
export const FACE_DISTANCE_THRESHOLD = 0.32;
export const REDUCED_THRESHOLD = 0.4;
export const REDUCED_THRESHOLD_MOBILE = 0.37;
