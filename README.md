# testeo

- Iniciar con "npm install"

- confirmar funciones con "npm test" 

- npm test se asigna el el archivo package.json en el directorio raíz, puede ser modificado a otro nombre manteniendo funcionalidad. El mismo ejecuta todos los test que se encuentran en el directorio tests.


En la carpeta test esta el codigo de server.spec.js en el se encuentran las pruebas a realizar, por ejemplo:

    const request = require("supertest");
    const server = require("../index");


    describe("Testeo funciones cafeteria nanacao", () => {
    it("Retornar arreglo con los cafés", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0); 
    });});


# detalle 

- aqui llama las funciones de supertest, el cual simula la peticion que se va a realizar con get, post, put, delete, etc.

        const request = require("supertest");



- describe es el padre en las funciones de testeo, y es el que nombra al test suite.

       describe("nombre del test suite", () => {});


- it es el nombre del test que esta bajo el describe, puede ser uno o varios, si uno de dichos test falla, test suite falla tambien.

       it ("nombre del test", async () => {});


- Aquí simula la peticion que se va a realizar con get para llamar a /cafes (supertest), y se asigna a response, que es el resultado de la peticion.

        const response = await request(server).get("/cafes")


- expect lee el response.status el cual esta definido en const response, en response busca el status y lo compara con el tobe, que esta definico como un codigo 200, si la respuesta del response es diferente a 200 el test falla, por ejemplo 404 con un not found.

        expect(response.status).toBe(200);


- expect lee el body del response y evalua si el body es un array con isArray, esta funcion regresa un truel o false, por lo que el tobe esta confirmando con el (true) que el body es un array.

      expect(Array.isArray(response.body)).toBe(true);


- expect lee el body,lenght del response y evalua si la longitud es mayor a 0, utilizando el comparador greaterThan que es una funcion de jest, el greaterThan debe ser siempre mayor.

        expect(response.body.length).toBeGreaterThan(0);

- Por ejemplo si el body.length es 1 y el codigo es el siguiente fallaria, si bien toBeGreaterThan compara numeros su respuestas no son numeros, son true or false.

        expect(response.body.length).toBeGreaterThan(1); 