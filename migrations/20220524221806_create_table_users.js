exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNull();
    table.integer('account').unique();
    table.decimal('amount', 8, 2);
    table.string('cpf').notNull().unique();
    table.string('password').notNull();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
