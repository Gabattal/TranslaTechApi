import {describe, expect, it} from "vitest";
import {decodeString} from "./utils";

describe('translate/lib', ()=>{
    it('should decode the string',()=>{
        const stringToDecode = 'coucou\n ça va ou quoi\u000a moi ça va niquel'
        const decodedString = decodeString(stringToDecode)
        expect(decodedString).toBe('coucou\n ça va ou quoi\n moi ça va niquel')
    })


})