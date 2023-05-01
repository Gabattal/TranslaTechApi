import {describe, it} from "vitest";
import {translateDocument} from "./translate";

const sample = {
    test1 : "coucou ça va comment ?",
    test2 : "ça va super et toi ?"
}

describe.skip('translate/lib/translate',  () => {
    it('should encode the translation JSON',async () => {
        const translatedDocument = await translateDocument(sample,'fr','en-GB')
        console.log(translatedDocument)
    })
})