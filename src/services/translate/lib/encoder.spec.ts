import {describe, expect, it} from "vitest";
import {flattenDocument} from "./encoder";

const sample = {
    a: "coucou",
    b: {
        c: "Salut toi"
    }
}

describe('translate/lib/encoder', () => {
    it('should encode the translation JSON', () => {
        const encodedJson = flattenDocument(sample)
        expect(encodedJson).toEqual({
            "a": "coucou",
            "b.c": "Salut toi"
        })
    })
})