import pkg from 'pg'

const {Client} = pkg

const database = new Client({
    user: process.env.PG_USER || "postgres",
    host: process.env.PG_HOST || "localhost",
    database: process.env.PG_DATABASE || "e-commerce",
    password: process.env.PG_PASSWORD || "1234",
    port: process.env.PG_PORT || 5432,
})

try {
    await database.connect()
    console.log("Database connected successfully")
}
catch (error) {
    console.error("Database connection failed:", error)
    process.exit(1)
}
export default database