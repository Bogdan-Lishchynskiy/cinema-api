const request = require('supertest');
const {Genre} = require('../../models/genre');
const {User} = require('../../models/user');
let serv;

describe('/api/genres', () => {
  beforeEach(() => { serv = require('../../bin/www');
  });
  afterEach(async () => {
    serv.close();
    await Genre.remove({});
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.collection.insertMany([{name: 'genre1'},{ name: 'genre2'}]);
      const res = await request(serv).get('/api/genres');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a genre if valid id is passed', async () => {
      const genre = new Genre({
        name: 'genre1'
      });
      await genre.save();

      const res = await request(serv).get('/api/genres/' + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });

    it('should return 404 if invalid id is passed', async () => {
      const res = await request(serv).get('/api/genres/1');
      
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    let token;
    let name;

    const execute = async () => {
      return await request(serv)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({
          name: name
        });
    };
    beforeEach(() => {
      token = new User().generateAuthToken();
      name = 'genre1';
    });

    it('should return a 401 if client is not login', async () => {
      token = '';
      const res = await execute();

      expect(res.status).toBe(401);
    });

    it('should return a 400 if genre length is less than 5 charackters', async () => {
      name = '1234';
      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('should return a 400 if genre is more than 50 charackters', async () => {
      name = new Array(52).join('a');
      const res = await execute();

      expect(res.status).toBe(400);
    });

    it('should save the genre if it is valid', async () => {
      await execute();
      const genre = await Genre.find({ name: 'genre1'});

      expect(genre).not.toBeNull();
    });

    it('should return the genre if it is valid', async () => {
      const res = await execute();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre1');
    });
  });
});