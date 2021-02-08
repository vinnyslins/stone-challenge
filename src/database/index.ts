import knex from 'knex'

import configuration from './knexfile'

const config = (configuration as any)[process.env.NODE_ENV || 'development']

const connection = knex(config)

export default connection
