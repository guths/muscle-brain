import app from "./app";
import { verificationEmailConsumer } from "./consumers/verification-email.consumer";
const port = process.env.APP_PORT || 3000;;

async function start() {
    app.listen(port, (): void => {
        console.info(`Server Running in port 👉 ${port}`);
    });
}

verificationEmailConsumer.start();

start();