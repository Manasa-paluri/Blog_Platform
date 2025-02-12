exports.up = function(knex) {
    return knex.schema.createTable('blogs', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('content').notNullable();
      table.string('image');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('blogs');
  };
  