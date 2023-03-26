# Booking API con Microservicios

Este proyecto implementa un sistema de reserva utilizando microservicios y un API Gateway. La solución se basa en NestJS y utiliza PostgreSQL como base de datos.

## Tecnologías utilizadas

- NestJS
- Node.js 18.14.1
- PostgreSQL
- TypeORM
- Docker y Docker Compose

## Prerrequisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Estructura del proyecto

- booking-api-gateway: API Gateway para interactuar con los microservicios.
- booking-ms-authentication: Microservicio de autenticación.
- booking-ms-user: Microservicio de usuarios.
- booking-ms-core: Microservicio central que se comunica con los microservicios de usuarios y salas.
- booking-ms-room: Microservicio de salas.
- booking-ms-notification: Microservicio de notificaciones.

## Configuración

1. Asegúrate de que todos los microservicios y el API Gateway tienen un archivo `.env` en su directorio raíz que incluye las variables de entorno necesarias. Puedes tomar como referencia las variables proporcionadas en la pregunta inicial.

2. Asegúrate de que todos los microservicios y el API Gateway tienen un archivo `Dockerfile` en su directorio raíz que define cómo construir la imagen de Docker para ese servicio.

3. Crea un archivo `docker-compose.yml` en el directorio raíz del proyecto que contenga la definición de todos los servicios, como se proporcionó en las respuestas anteriores.

## Despliegue local

1. Clona el repositorio en tu máquina local.

```bash
git clone <URL_DEL_REPOSITORIO>
```

2. Cambia al directorio del proyecto.

```bash
cd <NOMBRE_DEL_DIRECTORIO_DEL_PROYECTO>
```

3. Construye y ejecuta todos los servicios utilizando Docker Compose.

```docker
docker-compose up -d
```

4. Accede al API Gateway en `http://localhost:3000/api/v1`.

## Detener y eliminar los contenedores

Para detener y eliminar los contenedores, ejecuta el siguiente comando en el directorio del proyecto:

```docker
docker-compose down
```

## Documentación adicional

- [NestJS](https://docs.nestjs.com/)
- [Node.js](https://nodejs.org/en/docs/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [TypeORM](https://typeorm.io/#/)
- [Docker](https://docs.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/)

## Contribuciones

Por favor, lee las [guías de contribución](CONTRIBUTING.md) para obtener detalles sobre cómo contribuir al proyecto.

