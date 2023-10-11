

import { expect, test, describe} from 'vitest'
import {StringCalculator} from './StringCalculator';

describe("String Calculator", () => {
    test("\"\" should = 0", () => {
        const input = "";
        const result = StringCalculator.Add(input);
        expect(result).toEqual(0);
    })

    test("'1' should = 1", () => {
        const input = "1";
        const result = StringCalculator.Add(input)
        expect(result).toEqual(1);
    })
    
    test("'1,3' should = 4", () => {
        const input = '1,3';
        const result = StringCalculator.Add(input);
        expect(result).toEqual(4);
    })

    test("'1,2,4' should = 7", () => {
        const input = '1,2,4';
        const result = StringCalculator.Add(input);
        expect(result).toEqual(7);
    })
    test("'1\\n2' should = 3", () => {
        const input = '1\n2';
        const result = StringCalculator.Add(input);
        expect(result).toEqual(3);
    })
    test("'1\\n5' should = 6", () => {
        const input = '1,\n5';
        const result = StringCalculator.Add(input);
        expect(result).toEqual(6);
    })

    test("'1,2,' should error", () => {
        const input = '1,2,';
        const callback = () => StringCalculator.Add(input);
        expect(callback).toThrowError();
    })
    test("',1,2' should error", () => {
        const input = ',1,2';
        const callback = () => StringCalculator.Add(input);
        expect(callback).toThrowError();
    })

    test("\"//;\\n1;3\" should = 4", () => {
        const input = '//;\n1;3';
        const result: number = StringCalculator.Add(input);
        expect(result).toEqual(4);
    })

    test('“//sep\\n2sep5” should = 7', () => {
        const input = '//sep\n2sep5';
        const result: number = StringCalculator.Add(input);
        expect(result).toEqual(7);
    })

    test('“//|\\n1|2|3” should = 6', () => {
        const input = '//|\n1|2|3';
        const result: number = StringCalculator.Add(input);
        expect(result).toEqual(6);
    })
    test('“//|\\n1|2,3” should error', () => {
        const input = '//|\n1|2,3';
        const callback = () => StringCalculator.Add(input);
        expect(callback).toThrowError();
    })
})