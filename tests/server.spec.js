const request = require("supertest");
const server = require("../index");

describe("Testeo funciones cafeteria nanacao", () => {
  
  
  it("Retornar arreglo con los cafés", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0); 
  });

  
  it("Retornar un codigo 404 al intentar eliminar un café con un id inexistente", async () => {
    const response = await request(server)
      .delete("/cafes/999")
      .set("Authorization", "token_jwt_simulado");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No se encontró ningún cafe con ese id");
  });

  
  it("Agregar un nuevo café y retornar un codigo 201", async () => {
    const nuevoCafe = { 
      id: 5,
      nombre: "Latte"
    };

    const response = await request(server)
      .post("/cafes")
      .send(nuevoCafe)  
      .set("Authorization", "token_jwt_simulado"); 
    
    expect(response.status).toBe(201);
    expect(response.body).toContainEqual(nuevoCafe); 
  });

 
  it("Debe retornar un codigo 400 si el id en los parámetros no coincide con el id en el body", async () => {
    const cafeToUpdate = {
      id: 6,
      nombre: "Espresso"
    };

    const response = await request(server)
      .put("/cafes/5")  
      .send(cafeToUpdate)
      .set("Authorization", "token_jwt_simulado"); 

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("El id del parámetro no coincide con el id del café recibido");
  });

});
