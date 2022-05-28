exports.up = function (knex, Promise) {
  return knex.schema.createTable('stock', table => {
    table.increments('id').primary();
    table.string('name').unique();
    table.integer('qtd');
    table.integer('userId').references('id').inTable('users').notNull();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('stock');
};
