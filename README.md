# Proyecto 001 - Quality Brains

## Habits Trainer o Entrenador Hábitos

### Configuración inicial

1. Instalar Node JS
2. Clonar el repositorio
3. Hacer cd a la carpeta entrenador-habitos
4. npm install
5. Ejecutar contenedor de Cockroach DB en docker, descarga la imagen de docker y luego ejecuta estos comandos:

   a) Para crear el volumen: docker volume create roach-single

   b) Para inicializar la instancia local: docker run -d --env COCKROACH_DATABASE=habitosdb --env COCKROACH_USER=postgres --env COCKROACH_PASSWORD=SuperStrong01 --name=roach-single --hostname=roach-single -p 26257:26257 -p 8080:8080 -v "roach-single:/cockroach/cockroach-data" cockroachdb/cockroach start-single-node --http-addr=roach-single:8080 --insecure

   c) Cuando quieras detener la instancia es recomendable ejecutar este comando, evita pérdida de datos: docker stop -t 300 roach-single

6. Configurar archivo .env para las variables de entorno, debería ser algo como esto:

   DATABASE_URL="postgresql://root@127.0.0.1:26257/defaultdb?sslmode=disable"
   NEXTAUTH_SECRET="ASuperSecretPasswordOrWhatever"
   NODE_ENV="development"

Previsualización app URL: <https://proyecto-001.vercel.app/>
