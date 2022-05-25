exports.up = function (knex, Promise) {
  return knex.schema.createTable('accounts', table => {
    table.increments('id').primary();
    table.integer('account');
    table.decimal('amount', 8, 2);
    table.integer('userId').references('id').inTable('users').notNull();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('accounts');
};
