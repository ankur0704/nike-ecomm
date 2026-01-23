
import { db } from "../src/db";
import { sql } from "drizzle-orm";

async function main() {
    console.log("Checking tables...");
    try {
        const result = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
        console.log("Tables:", result.rows.map(r => r.table_name));
    } catch (error) {
        console.error("Failed to list tables:", error);
    }
    process.exit(0);
}

main();
