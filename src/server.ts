import app from "./app";
import { PrismaClient } from '@prisma/client'
const port = process.env.APP_PORT || 3000;;

const prisma = new PrismaClient()
async function start() {
    app.listen(port, (): void => {
        console.info(`Server Running in port 👉 ${port}`);
    });
}

start();