module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "77803",
      database: process.env.DB_NAME || "blogdb"
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};
