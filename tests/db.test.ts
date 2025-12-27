import { db } from "@/lib/db";
import { test, expect } from 'bun:test';    
import { usersTable } from "@/lib/db/schema";

test('should connect to the database', async () => {
    expect(db).toBeDefined();
    const result = await db.select().from(usersTable);
    expect(result).toBeDefined();
});