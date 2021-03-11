module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306,
        host: '127.0.0.1',
        dialect: 'mysql',
        connectTimeout: 60000,
        seederStorage: 'json',
    },
    staging: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: '127.0.0.1',
        dialect: 'mysql',
        connectTimeout: 60000,
        seederStorage: 'json',
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false,
        connectTimeout: 60000,
        seederStorage: 'json',
    },
};
//# sourceMappingURL=dbConfig.js.map