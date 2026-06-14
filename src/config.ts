const config = {
    db : {
        host: process.env.DB_HOST || "development-server1.database.windows.net",
        port: parseInt(process.env.DB_PORT || "1433"),
        username: process.env.DB_USERNAME || "ahmadaufaghani",
        password: process.env.DB_PASSWORD || "DbGhani2026*",
        database: process.env.DATABASE || "todos",
        dialect: "mssql",
        pool: {
            max: 10,      
            min: 0,     
            idle: 60000,  
            acquire: 60000 
        },
        dialectOptions : {
            encrypt : true,
            connectionTimeout: 360000
        }
    },
    env : process.env.NODE_ENV || "development",
    port : process.env.PORT || "3000"
}

export default config;