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
})
