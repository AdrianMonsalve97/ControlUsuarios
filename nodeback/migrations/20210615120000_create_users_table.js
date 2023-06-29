exports.up = function (knex) {
  return knex.schema.createTable('usuarios', function (table) {
    table.increments('id').primary();
    table.string('nombre').notNullable();
    table.string('correoElectronico').notNullable().unique();
    table.string('imagen');
    table.string('direccion');
    table.string('numeroTelefono');
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('usuarios');
};
