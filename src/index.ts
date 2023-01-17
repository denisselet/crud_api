import http from 'http';
import dotenv from 'dotenv';
import './common/config.mts';

// @ts-ignore
import { requestListener } from './services/requestListener.ts';

dotenv.config();
const server = http.createServer(requestListener);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
