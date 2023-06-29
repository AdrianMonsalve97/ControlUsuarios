module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'Amonsalve97',
      database: 'bdusuarios',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
