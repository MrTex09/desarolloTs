# README - Proyecto Desarrollots

## Instalación

Sigue estos pasos para instalar y configurar el proyecto:

1. **Clonar el Repositorio**

   ```bash
   git clone https://github.com/MrTex09/desarolloTs
   cd desarrollots
   ```

2. **Instalar Dependencias**

   ```bash
   npm install
   ```

## Scripts

Aquí están los scripts definidos en `package.json`:

- `dev`: Inicia el proyecto en modo de desarrollo usando `nodemon` y `ts-node`.
- `init-admin`: Ejecuta un script para inicializar un usuario administrador.

## Inicializar Usuario Administrador

Para crear un usuario administrador, sigue estos pasos:

1. **Configura las Variables de Entorno**

   Asegúrate de tener un archivo `.env` con las variables de entorno necesarias para tu base de datos y otras configuraciones. Ejemplo de variables que podrías necesitar:

   ```env
   PORT=3000
   DB_USER=your_user
   DB_PASS=your_password
   DB_NAME=inventory_db
   JWT_SECRET=tu_secreto_jwt
   DB_HOST=localhost
   ```

2. **Ejecuta el Script para Crear el Usuario Administrador**

   Usa el siguiente comando para ejecutar el script que inicializa el usuario administrador:

   ```bash
   npm run init-admin
   ```

   Este comando ejecutará `ts-node ./src/config/initAdmin.ts` y creará un usuario administrador en la base de datos.

## Uso

Para ejecutar el proyecto en modo de desarrollo:

```bash
npm run dev
```

Esto iniciará el servidor usando `nodemon` y `ts-node`, con recarga automática para los cambios en el código.

