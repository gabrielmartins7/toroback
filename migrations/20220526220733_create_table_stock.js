exports.up = function (knex, Promise) {
  return knex.schema.createTable('stock', table => {
    table.increments('id').primary();
    table.string('name');
    table.integer('amount');
    table.decimal('value', 8, 2);
    table.timestamp('dt_event').defaultTo(knex.fn.now());
    table.integer('userId').references('id').inTable('users').notNull();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('stock');
};
