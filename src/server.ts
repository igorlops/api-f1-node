import { fastify } from "fastify"
import cors from 'fastify-cors'

const server = fastify({logger: true})

server.register(cors, {
    origin:"*",
    methods:["GET"]
})

const teams = [
    { id:1, nome:"Nome teams teste 1", desc: "Descrição teams teste 1"},
    { id:2, nome:"Nome teams teste 2", desc: "Descrição teams teste 2"},
    { id:3, nome:"Nome teams teste 3", desc: "Descrição teams teste 3"},
]
const drivers = [
    {id:1, nome:"Nome drivers teste 1", desc: "Descrição drivers teste 1"},
    {id:2, nome:"Nome drivers teste 2", desc: "Descrição drivers teste 2"},
    {id:3, nome:"Nome drivers teste 3", desc: "Descrição drivers teste 3"},
]
server.get('/teams', async(request, response) => {
    response.type("application/json").code(200);
    return teams
})
server.get('/drivers', async(request, response) => {
    response.type("application/json").code(200);
    return drivers
})

interface DriverParams {
    id: string
}

server.get<{Params: DriverParams}>('/drivers/:id', async(request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find(dr => dr.id === id);
    return driver;
})

server.listen({ port: 3333}, () => {
    console.log("Server init ")
})