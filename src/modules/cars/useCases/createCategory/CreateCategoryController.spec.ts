import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 } from 'uuid';

import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';

let connection: Connection;
describe('Create Category Controller', () => {
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

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentalx.com',
      password: 'admin',
    });
    const { token } = responseToken.body;
    const response = await request(app).post('/categories').send({
      name: '4 portas',
      description: 'Carro com 4 portas',
    }).set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(201);
  });
  it('should not be able to create a new category with name exists', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentalx.com',
      password: 'admin',
    });
    const { token } = responseToken.body;
    const response = await request(app).post('/categories').send({
      name: '4 portas',
      description: 'Carro com 4 portas',
    }).set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(400);
  });
});
