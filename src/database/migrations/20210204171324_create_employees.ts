import * as Knex from 'knex'

export const up = (knex: Knex) => knex.schema.createTable('employees', table => {
  table.increments('id').primary()
  table.string('name').notNullable()
  table.integer('age').notNullable()
  table.string('position').notNullable()
  table.timestamps(false, true)
})

export const down = (knex: Knex) => knex.schema.dropTable('employees')
