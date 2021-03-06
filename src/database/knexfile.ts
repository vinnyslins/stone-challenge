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
  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      ssl: {
        rejectUnauthorized: false
      }
    }
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'test.sqlite3')
    },
    useNullAsDefault: true
  }
}
