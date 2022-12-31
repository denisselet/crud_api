import cluster from 'cluster';
import http from 'http';
import { cpus } from 'os';
import process from 'process';
import dotenv from 'dotenv';
// @ts-ignore
import { requestListener } from './services/requestListener.ts';
dotenv.config();

const PORT_BEGIN = process.env.PORT;

if (cluster.isPrimary) {
  for (let i = 1; i < cpus().length + 1; i += 1) {
    cluster.fork({ PORT: Number(PORT_BEGIN) + i });
    // cluster.workers[i].on('message', messageHandler);
  }

  const controllerRequest = (req, res) => {
    requestListener(req, res);
  };
  http.createServer(controllerRequest).listen(process.env.PORT);
} else {
  const PORT = process.env.PORT;
  const server = http.createServer(requestListener);
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  console.log(`Worker ${process.pid} started`);
}
