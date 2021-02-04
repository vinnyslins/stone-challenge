import 'dotenv/config'

export default {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    }
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/test.sqlite3'
    }
  }
}
