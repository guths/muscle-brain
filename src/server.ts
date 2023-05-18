import app from "./app";
const port = process.env.APP_PORT || 3000;;

async function start() {
    app.listen(port, (): void => {
        console.info(`Server Running in port 👉 ${port}`);
    });
}

start();