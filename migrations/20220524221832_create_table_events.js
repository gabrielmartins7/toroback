exports.up = function (knex, Promise) {
  return knex.schema.createTable('events', table => {
    table.increments('id').primary();
    table.integer('origin_bank');
    table.integer('origin_branch');
    table.string('origin_cpf');
    table.integer('target_bank');
    table.integer('target_branch');
    table.string('target_account');
    table.decimal('amount', 8, 2);
    table.string('event');
    table.timestamp('dt_event').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('events');
};
