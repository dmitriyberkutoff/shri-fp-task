import Api from '../tools/api';
import {__, allPass, andThen, assoc, compose, ifElse, otherwise, partial, prop, tap, test} from "ramda";

const api = new Api();
const getResult = prop('result');
const promiseGetResult = andThen(getResult);

const moreThanTwo = (x) => x > 2;
const lessThanTen = (x) => x < 10;
const getLength = prop('length');
const promiseGetLength = andThen(getLength);
const lengthMoreThanTwo = compose(moreThanTwo, getLength);
const lengthLessThanTen = compose(lessThanTen, getLength);

const isNumber = test(/^[0-9]+\.?[0-9]+$/);
const isNumberFromTwoToTen = allPass([isNumber, lengthMoreThanTwo, lengthLessThanTen]);
const castAndRound = compose(Math.round, Number);

const connectNumber = assoc('number', __, {from: 10, to: 2});
const decimalToBinary = compose(api.get('https://api.tech/numbers/base'), connectNumber);
const emptyGet = api.get(__, {});
const promiseEmptyGet = andThen(emptyGet);

const connectAnimalId = (id) => `https://animals.tech/${id}`;
const promiseConnectAnimalId = andThen(connectAnimalId);

const square = (x) => x * x;
const promiseSquare = andThen(square);

const modThree = (x) => x % 3;
const promiseModThree = andThen(modThree);

const processSequence = ({value, writeLog, handleSuccess, handleError}) => {
    const tapWriteLog = tap(writeLog);
    const promiseTapWriteLog = andThen(tapWriteLog);
    const throwValidationError = partial(handleError, ['ValidationError']);
    const promiseHandleSuccess = andThen(handleSuccess);
    const elseHandleError = otherwise(handleError);

    const steps = compose(
        elseHandleError,
        promiseHandleSuccess,
        promiseGetResult,
        promiseEmptyGet,
        promiseConnectAnimalId,
        promiseTapWriteLog,
        promiseModThree,
        promiseTapWriteLog,
        promiseSquare,
        promiseTapWriteLog,
        promiseGetLength,
        promiseTapWriteLog,
        promiseGetResult,
        decimalToBinary,
        tapWriteLog,
        castAndRound
    );

    const conditionalStep = ifElse(isNumberFromTwoToTen, steps, throwValidationError)
    const process = compose(conditionalStep, tapWriteLog);
    process(value);
}

export default processSequence;
