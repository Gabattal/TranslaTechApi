import {Type} from "@fastify/type-provider-typebox";
import {flattenDocument, unFlattenDocument} from "@/services/translate/lib/encoder";
import {TServer} from "@";
import {translateDocument} from "@/services/translate/lib/translate";


const schema = {
    body: Type.Object({
        document : Type.Any(),
        lang: Type.Any(),
        targetLang: Type.Any()
    }),
    response : {
        200: Type.Object({
            document : Type.Any(),
        })
    }
}

export default async (server: TServer) => {
    server.post(
        '/translate/document',
        {schema},
        async (request, reply) => {
            const document = request.body.document
            const lang = request.body.lang
            const targetLang = request.body.targetLang
            const flattenedDocument = flattenDocument(document)
            const translatedDocument = await translateDocument(flattenedDocument,lang,targetLang)
            const unFlattenedDocument = unFlattenDocument(translatedDocument)

            reply.send({
                document: unFlattenedDocument
            })

        })
}