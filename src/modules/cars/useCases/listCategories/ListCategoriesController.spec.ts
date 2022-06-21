import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 } from 'uuid';

import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';

let connection: Connection;
describe('List Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const id = v4();
    const password = await hash('admin', 8);

    await connection.query(`INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license) 
  VALUES('${id}', 'admin', 'admin@rentalx.com', '${password}', true, 'now()', 'AAA-1111' )`);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentalx.com',
      password: 'admin',
    });
    const { refresh_token } = responseToken.body;
    await request(app).post('/categories').send({
      name: '4 portas',
      description: 'Carro com 4 portas',
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const list = await request(app).get('/categories');
    console.log('result', list);
    expect(list.status).toBe(200);
    expect(list.body.length).toBe(1);
    // expect(list.body[0]).toHaveProperty('id');
  });
});
