exports.up = function (knex, Promise) {
  return knex.schema.createTable('events', table => {
    table.increments('id').primary();
    table.integer('origin');
    table.integer('target');
    table.decimal('amount', 8, 2);
    table.string('event');
    table.timestamp('dt_event').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('events');
};
