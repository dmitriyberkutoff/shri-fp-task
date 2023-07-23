import {allPass, any, complement, compose, dissoc, equals, identity, countBy, prop, propEq, values} from "ramda";

const getCircle = prop('circle');
const getSquare = prop('square');
const getTriangle = prop('triangle');
const getStar = prop('star');
const getGreen = prop('green');
const greenEqualsTwo = propEq('green', 2);
const redEqualsOne = propEq('red', 1);

const isRed = equals('red');
const isGreen = equals('green');
const isBlue = equals('blue');
const isOrange = equals('orange');
const isWhite = equals('white');

const isWhiteCircle = compose(isWhite, getCircle);
const isBlueCircle = compose(isBlue, getCircle);
const isWhiteTriangle = compose(isWhite, getTriangle);
const isGreenTriangle = compose(isGreen, getTriangle);
const isWhiteSquare = compose(isWhite, getSquare);
const isGreenSquare = compose(isGreen, getSquare);
const isOrangeSquare = compose(isOrange, getSquare);
const isRedStar = compose(isRed, getStar);
const isWhiteStar = compose(isWhite, getStar);
const isNotRedStar = complement(isRedStar);
const isNotWhiteStar = complement(isWhiteStar);
const isNotWhiteTriangle = complement(isWhiteTriangle);
const isNotWhiteSquare = complement(isWhiteSquare);

const numberOfColors = compose(countBy(identity), values);
const numberOfGreenColors = compose(getGreen, numberOfColors);

const moreThanOne = (x) => x > 1;
const moreThanTwo = (x) => x > 2;
const anyMoreThanTwo = any(moreThanTwo);
const anyValueMoreThanTwo = compose(anyMoreThanTwo, values);
const redCounterEqualsBlue = ({blue, red}) => blue === red;
const squareCounterEqualsTriangle = ({square, triangle}) => square === triangle;

const dissocWhite = dissoc('white');
const nonWhiteColors = compose(dissocWhite, numberOfColors);
const isGreenEqualsTwo = compose(greenEqualsTwo, numberOfColors);
const isRedEqualsOne = compose(redEqualsOne, numberOfColors);
const allColors = (color) => compose(propEq(color, 4), numberOfColors);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([isWhiteCircle, isGreenSquare, isWhiteTriangle, isRedStar]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(moreThanOne, numberOfGreenColors);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(redCounterEqualsBlue, numberOfColors);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([isBlueCircle, isRedStar, isOrangeSquare]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(anyValueMoreThanTwo, nonWhiteColors);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([isGreenTriangle, isGreenEqualsTwo, isRedEqualsOne]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = allColors('orange');

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([isNotRedStar, isNotWhiteStar]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = allColors('green')

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([squareCounterEqualsTriangle, isNotWhiteTriangle, isNotWhiteSquare]);
