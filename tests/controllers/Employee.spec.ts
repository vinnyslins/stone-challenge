import request from 'supertest'

import app from '../../src/app'
import connection from '../../src/database'

describe('Employee controller', () => {
  beforeEach(async () => {
    await connection('employees').truncate()
    await connection('employees').insert({ name: 'Vinnys', age: 21, position: 'Software engineer' })
  })

  afterAll(async done => {
    await connection.destroy()
    done()
  })

  describe('GET /employees', () => {
    it('should return status code 200 with a list of employees', async () => {
      await connection('employees').insert({ name: 'Carlos', age: 25, position: 'Data engineer' })

      const { status, body } = await request(app)
        .get('/api/employees')

      const expected = [
        { id: 1, name: 'Vinnys', age: 21, position: 'Software engineer' },
        { id: 2, name: 'Carlos', age: 25, position: 'Data engineer' }
      ]

      expect(status).toBe(200)
      expect(body).toEqual(expected)
    })
  })

  describe('GET /employees/:id', () => {
    it('should return status code 200 with the employee', async () => {
      const { status, body } = await request(app)
        .get('/api/employees/1')

      const expected = { id: 1, name: 'Vinnys', age: 21, position: 'Software engineer' }

      expect(status).toBe(200)
      expect(body).toEqual(expected)
    })

    it('should return status code 404 if the employee does not exist', async () => {
      const { status } = await request(app)
        .get('/api/employees/2')

      expect(status).toBe(404)
    })
  })

  describe('POST /employees', () => {
    it('should return status code 201 and create a employee', async () => {
      const { status } = await request(app)
        .post('/api/employees')
        .send({ name: 'Carlos', age: 25, position: 'Data engineer' })

      const employee = await connection('employees').where({ id: 2 }).first()
      const expected = { id: 2, name: 'Carlos', age: 25, position: 'Data engineer' }

      expect(status).toBe(201)
      expect(employee).toEqual(expected)
    })

    it('should return status code 400 if a disallowed field is sent', async () => {
      const { status } = await request(app)
        .post('/api/employees')
        .send({ foo: 'bar' })

      expect(status).toBe(400)
    })
  })

  describe('PUT /employess/:id', () => {
    it('should return status code 200 and update a employee', async () => {
      const { status, body } = await request(app)
        .put('/api/employees/1')
        .send({ name: 'Vinnys', age: 22, position: 'Data engineer' })

      const expected = { id: 1, name: 'Vinnys', age: 22, position: 'Data engineer' }

      expect(status).toBe(200)
      expect(body).toEqual(expected)
    })

    it('should return status code 400 if a disallowed field is sent', async () => {
      const { status } = await request(app)
        .put('/api/employees/1')
        .send({ foo: 'bar' })

      expect(status).toBe(400)
    })

    it('should return status code 404 if the employee does not exist', async () => {
      const { status } = await request(app)
        .put('/api/employees/2')
        .send({ name: 'Vinnys', age: 22, position: 'Data engineer' })

      expect(status).toBe(404)
    })
  })
})
