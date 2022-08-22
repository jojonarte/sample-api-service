import { Knex } from "knex";
import * as constraints from '../../config/schema-constraints'

export async function up(knex: Knex): Promise<void> {
    const createIdAndTimestamps = (table: Knex.CreateTableBuilder): void => {
        table.increments('id').primary()
        table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now())
        table.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now())
        table.dateTime('deletedAt').index()
    }

    await knex.schema.createTable('users', table => {
        createIdAndTimestamps(table)

        table.string('username', constraints.user.usernameMaxLength).unique()
        table.string('password', constraints.user.passwordMaxLength)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users')
}

