# API REST CRUD con Express

Este proyecto es una API REST que permite realizar operaciones CRUD sobre vehiculos, nos facilitará administrar el servicio post-venta en un taller.

## Instalación
1. Clona este repositorio.
2. Instala las dependencias con `npm install`.


## Inicialización

Para ejecutar el servidor en desarrollo:
1. Ejecuta el servidor con `npm run dev`.

Para ejecutar el servidor en producción:
1. Compila el código TypeScript a JavaScript con `npm run build`.
2. Ejecuta el servidor con `npm start`.

## Uso

- `GET /vehiculo`: Obtiene todos los vehiculos.
- `GET /vehiculo/:id`: Obtiene un vehiculo.
- `POST /vehiculo`: Crea un nuevo vehiculo.
- `PUT /vehiculo/:id`: Actualiza un vehiculo existente.
- `DELETE /vehiculo/:id`: Elimina un vehiculo.

### Ejemplo de solicitud POST

```json
{
  "marca": "YANAHA",
  "patente": "AAA111",
  "kilometraje": 1500,
  "nMotor": "123456",
  "nChasis": "123456",
  "servicio": "1 SERVICE",
  "estado": "INGRESADO"
 },
