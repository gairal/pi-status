import { app, server } from "./app";
import "./config";
import { router } from "./controllers";
import { startSockets } from "./sockets";

app.use(router.routes());
startSockets();

server.listen(process.env.PORT || 8080);
