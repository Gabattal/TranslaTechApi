import {SourceLanguageCode, TargetLanguageCode, Translator} from "deepl-node";

const translator = new Translator("f1e467cb-cda2-a12b-b909-a6df282d0f00:fx")

export async function translateDocument(document: Record<string, string>, lang: SourceLanguageCode, targetLang: TargetLanguageCode) {
    const translatedResult = await translator.translateText(Object.values(document), lang, targetLang)
    const translatedValues = translatedResult.map((result) => result.text)
    const translatedDocument = {}
    const documentKeys = Object.keys(document)

    for (let i = 0; i < documentKeys.length; i++) {
        translatedDocument[documentKeys[i]] = translatedValues[i]
    }

    return translatedDocument
}