import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import createTranslateHandler from '@/services/translate/handlers/translateDocument'
import cors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import {TypeBoxTypeProvider} from "@fastify/type-provider-typebox";

const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

export type TServer = typeof app;

async function initServer(server:TServer){
    const plugins = [
        { plugin: cors, options: { origin: ['*'] } },
    ];
    plugins.forEach(({ plugin, options }) => server.register(plugin, options));

    server.register(fastifyMultipart, {
        addToBody: true,
    });

    server.post('/upload', async (request: FastifyRequest, reply: FastifyReply) => {
        const { fileInput } = request.body;
        const content = JSON.parse(fileInput[0].data.toString());
        return content;
    });

    server.get('/test', async (request: FastifyRequest, reply: FastifyReply) => {
        return 'coucou';
    });
    await createTranslateHandler(server)
    return server
}

initServer(app).then((server)=>{
    server.listen({
        port: 3000,
        host: 'localhost',
    }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening on ${address}`);
        console.log(server.printRoutes());
    });
})