const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    it("Codigo 200 en solicitud GET/cafes y validacion de Array con almenos un objeto", async () => {
        let {statusCode, body} = await request(server).get("/cafes").send();
        if(body.length <=0) {
            body = "No existen objetos en la respuesta";
        }
        expect(statusCode).toBe(200);
        expect(body).toBeInstanceOf(Array);
    })

    it("Codigo 404 al aplicar DELETE a /cafes/:id con un id inexistente", async () => {
        const jwt ="TEST.AUTHORIZATION";
        const id = "TEST"; 
        const { statusCode } = await request(server).delete(`/cafes/${id}`).set('Authorization', jwt);
        expect(statusCode).toBe(404);
    })

    it("Codigo 201 al agregar un objeto con POST/cafes", async () => {
        const id = Math.floor(Math.random() * 999);
        const cafe = { id, nombre: `TEST.${id}` };
        const { statusCode } = await request(server).post("/cafes").send(cafe);
        expect(statusCode).toBe(201);
    });

    it("Codigo 400 al hacer PUT a /cafes/:id con un parametro id incongruente con el del payload", async () => {
        const id = "TEST";
        const cafe = { id: "test", nombre: `TEST.${id}` };
        const { statusCode } = await request(server).put(`/cafes/${id}`).send(cafe);
        expect(statusCode).toBe(400);
    });
});
