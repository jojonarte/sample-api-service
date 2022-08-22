import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    const createIdAndTimestamps = (table: Knex.CreateTableBuilder): void => {
        table.increments('id').primary()
        table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now())
        table.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now())
        table.dateTime('deletedAt').index()
    }

    return await knex.schema.createTable('apps', table => {
        createIdAndTimestamps(table)

        table.string('name').notNullable().index().unique();
        table.string('description').notNullable();
        table.string('imageUrl').nullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('apps')
}

