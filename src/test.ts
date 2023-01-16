import assert from 'assert';
import { describe, it } from 'node:test';
import './index.js';

const server = `http://localhost:${process.env.PORT || 3000}/`;

const request = (
  query: string,
  meth: string,
  body: object | undefined = undefined
) => {
  const options = {
    method: meth,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const optionsWithBody = { ...options, body: JSON.stringify(body) };
  return fetch(`${server}${query}`, optionsWithBody);
};

it('scenarios 1', async () => {
  const getAllObj = await request('api/users', 'GET');
  const getAllObjJson = await getAllObj.json();
  assert.deepStrictEqual(
    getAllObjJson,
    [],
    'Elementary array does not match'
  );

  const createObj = await request('api/users', 'POST', {
    username: 'fdgsdv',
    age: 25,
    hobbies: ['fgdg', 'gdfv']
  });
  const createObjJson = await createObj.json();
  const id = createObjJson.id;
  assert.deepStrictEqual(
    createObjJson,
    {
      username: 'fdgsdv',
      age: 25,
      hobbies: ['fgdg', 'gdfv'],
      id: id
    },
    'New User not created'
  );

  const updateObj = await request(`api/users/${id}`, 'PUT', {
    username: 'fdgsdv',
    age: 100000,
    hobbies: ['fgdg', 'gdfv']
  });
  const updateObjJson = await updateObj.json();
  assert.deepStrictEqual(await updateObjJson.age, 100000, 'User not updated');

  const deleteObj = await request(`api/users/${id}`, 'DELETE');
  assert.deepStrictEqual(deleteObj.status, 204, 'User not deleted');

  const searchDelObj = await request(`api/users/${id}`, 'GET');
  assert.deepStrictEqual(searchDelObj.status, 404, 'The user remains in the array');
});

it('scenarios 2', async () => {
  const getAllObj = await request('api/users', 'GET');
  const getAllObjJson = await getAllObj.json();
  assert.deepStrictEqual(
    getAllObjJson,
    [],
    'Elementary array does not match'
  );

  const createObj = await request('api/users', 'POST', {
    username: 'fdgsdv',
    age: 25,
    hobbies: ['fgdg', 'gdfv']
  });
  const createObjJson = await createObj.json();
  const id = createObjJson.id;
  assert.deepStrictEqual(
    createObjJson,
    {
      username: 'fdgsdv',
      age: 25,
      hobbies: ['fgdg', 'gdfv'],
      id: id
    },
    'New User not created'
  );

  const searchDelObj = await request(`api/users/${id}`, 'GET');
  assert.deepStrictEqual(searchDelObj.status, 200, 'The user remains in the array');

  const updateObj = await request(`api/users/${id}`, 'PUT', {
    username: 'fdgsdv',
    age: 100000,
    hobbies: ['fgdg', 'gdfv']
  });
  const updateObjJson = await updateObj.json();
  assert.deepStrictEqual(await updateObjJson.age, 100000, 'User not updated');

  const deleteObj = await request(`api/users/${id}`, 'DELETE');
  assert.deepStrictEqual(deleteObj.status, 204, 'User not deleted');
});

it('scenarios 3', async () => {
  const getAllObj = await request('api/users', 'GET');
  const getAllObjJson = await getAllObj.json();
  assert.deepStrictEqual(
    getAllObjJson,
    [],
    'Elementary array does not match'
  );

  const createObj = await request('api/users', 'POST', {
    username: 'fdgsdv',
    age: 25,
    hobbies: ['fgdg', 'gdfv']
  });
  const createObjJson = await createObj.json();
  const id = createObjJson.id;
  assert.deepStrictEqual(
    createObjJson,
    {
      username: 'fdgsdv',
      age: 25,
      hobbies: ['fgdg', 'gdfv'],
      id: id
    },
    'New User not created'
  );

  const updateObj = await request(`api/users/${id}`, 'PUT', {
    username: 'fdgsdv',
    age: 100000,
    hobbies: ['fgdg', 'gdfv']
  });

  const searchDelObj = await request(`api/users/${id}`, 'GET');
  assert.deepStrictEqual(searchDelObj.status, 200, 'The user remains in the array');

  const updateObjJson = await updateObj.json();
  assert.deepStrictEqual(await updateObjJson.age, 100000, 'User not updated');

  const deleteObj = await request(`api/users/${id}`, 'DELETE');
  assert.deepStrictEqual(deleteObj.status, 204, 'User not deleted');
});
