const config = {
    db : {
        host: process.env.DB_HOST || "development-server1.database.windows.net",
        port: parseInt(process.env.DB_PORT || "1433"),
        username: process.env.DB_USERNAME || "ahmadaufaghani",
        password: process.env.DB_PASSWORD || "DbGhani2026*",
        database: process.env.DATABASE || "todos",
        dialect: "mssql",
        pool: {
            min: 0, 
            max: 5,
            idle: 30000,
            acquire: 60000
        },
        dialectOptions : {
            encrypt : true,
        }
    },
    env : process.env.NODE_ENV || "development",
    port : process.env.PORT || "3000"
}

export default config;