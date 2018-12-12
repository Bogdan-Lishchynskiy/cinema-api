const {User} = require('../../models/user');
const {Genre} = require('../../models/genre');

const request = require('supertest');

describe('auth middleware', () => {
  beforeEach(() => {
    serv = require('../../bin/www');
  });
  afterEach(async () => {
    await Genre.remove({});
    serv.close();
  });

  let token;
  const execute = () => {
    return request(serv)
      .post('/api/genres')
      .set('x-auth-token', token)
      .send({
        name: 'genre1'
      });
  }

  beforeEach(() => {
    token = new User().generateAuthToken()
  });

  it('should return 401 if no token provided', async () => {
    token = '';
    const res = await execute();

    expect(res.status).toBe(401);
  });

  it('should return 400 if token is invalid', async () => {
    token = 'aaa';
    const res = await execute();

    expect(res.status).toBe(400);
  });

  it('should return 200 if token is valid', async () => {
    const res = await execute();

    expect(res.status).toBe(200);
  });

});