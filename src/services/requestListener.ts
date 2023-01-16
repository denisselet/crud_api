import { v1 as generateId, validate } from 'uuid';
// @ts-ignore
import { httpStatusCodes } from '../utils/constants.ts';
import { IncomingMessage, ServerResponse } from 'http';

const memory: { id: string; username: string; age: number; hobbies: string[]; }[] = [];
export const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  try {
    if (req.method === 'GET' && req.url === '/api/users') {
      const body = JSON.stringify(memory);
      res.writeHead(httpStatusCodes.OK, { 'Content-Type': 'text/plain' });
      res.end(body);
    }

    if (req.method === 'GET' && req.url?.startsWith('/api/users/')) {
      const id = req.url.split('/')[3];
      const userFind = memory.find((user) => user.id === id);
      if (userFind) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(memory.find((user) => user.id === id)));
      } else if (!validate(id)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('userId is invalid');
      } else if (!userFind) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'User not found' }));
      }
    }

    if (req.method === 'POST' && req.url === '/api/users') {
      req.on('data', (data) => {
        const { username, age, hobbies } = JSON.parse(data.toString());
        const id = generateId();
        const user = {
          id,
          username,
          age,
          hobbies
        };

        if (username && age && hobbies) {
          memory.push(user);
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(JSON.stringify(user));
        } else if (!validate(id)) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('userId is invalid');
        } else {
          res.writeHead(400);
          res.end(JSON.stringify({ message: 'Bad request' }));
        }
      });
    }

    if (req.method === 'PUT' && req.url?.startsWith('/api/users/')) {
      const id = req.url.split('/')[3];
      req.on('data', (data) => {
        const { username, age, hobbies } = JSON.parse(data.toString());
        const userFind = memory.find((user) => user.id === id);
        if (userFind) {
          userFind.username = username;
          userFind.age = age;
          userFind.hobbies = hobbies;
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(JSON.stringify(userFind));
        } else if (!validate(id)) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('userId is invalid');
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ message: 'User not found' }));
        }
      });
    }

    if (req.method === 'DELETE' && req.url?.startsWith('/api/users/')) {
      const id = req.url.split('/')[3];
      const userFind = memory.find((user) => user.id === id);
      if (userFind) {
        memory.splice(
          memory.findIndex((user) => user.id === id),
          1
        );
        res.writeHead(204);
        res.end();
      } else if (!validate(id)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('userId is invalid');
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'User not found' }));
      }
    }

    if (!req.url?.startsWith('/api/users')) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end("{message: 'Not Found!'}");
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error');
  }
};
