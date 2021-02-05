import path from 'path'
import { config } from 'dotenv'

config({ path: path.join(__dirname, '../../.env') })

export default {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './test.sqlite3'
    }
  }
}
