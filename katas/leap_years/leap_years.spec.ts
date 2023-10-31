import { expect, test, describe } from 'vitest';
import { isLeapYear } from './leap_years';

describe("Leap Years", () => {
    test("2001 should be a typical common year ", () => {
        const result = isLeapYear(2001);
        expect(result).toBe(false);
    })

    test("1996 should be a typical leap year", () => {
        const result = isLeapYear(1996);
        expect(result).toBe(true);
    })

    test("1900 should be an atypical common year", () => {
        const result = isLeapYear(1900);
        expect(result).toBe(false);
    })

    test("2000 should be an atypical leap year", () => {
        const result = isLeapYear(2000);
        expect(result).toBe(true);
    })
})