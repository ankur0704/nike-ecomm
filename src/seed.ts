
import { db } from "./db";
import * as schema from "./db/schema";
import { eq } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";

async function main() {
    console.log("🌱 Starting seeding...");

    // 1. Clear existing data (optional, be careful in prod)
    // For now we append or check unique. Assuming fresh DB for this task.

    // 2. Seed Filters
    console.log("Seeding Filters...");

    const gendersData = [
        { label: "Men", slug: "men" },
        { label: "Women", slug: "women" },
        { label: "Unisex", slug: "unisex" },
        { label: "Kids", slug: "kids" },
    ];

    const genderMap = new Map();
    for (const g of gendersData) {
        const inserted = await db.insert(schema.genders).values(g).onConflictDoNothing().returning();
        if (inserted.length > 0) genderMap.set(g.slug, inserted[0].id);
        else {
            const existing = await db.query.genders.findFirst({ where: eq(schema.genders.slug, g.slug) });
            if (existing) genderMap.set(g.slug, existing.id);
        }
    }

    const colorsData = [
        { name: "Black", slug: "black", hexCode: "#000000" },
        { name: "White", slug: "white", hexCode: "#FFFFFF" },
        { name: "Red", slug: "red", hexCode: "#FF0000" },
        { name: "Blue", slug: "blue", hexCode: "#0000FF" },
        { name: "Green", slug: "green", hexCode: "#00FF00" },
        { name: "Grey", slug: "grey", hexCode: "#808080" },
    ];

    const colorMap = new Map();
    for (const c of colorsData) {
        const inserted = await db.insert(schema.colors).values(c).onConflictDoNothing().returning();
        if (inserted.length > 0) colorMap.set(c.slug, inserted[0].id);
        else {
            const existing = await db.query.colors.findFirst({ where: eq(schema.colors.slug, c.slug) });
            if (existing) colorMap.set(c.slug, existing.id);
        }
    }

    const sizesData = [
        { name: "US 7", slug: "us-7", sortOrder: 1 },
        { name: "US 8", slug: "us-8", sortOrder: 2 },
        { name: "US 9", slug: "us-9", sortOrder: 3 },
        { name: "US 10", slug: "us-10", sortOrder: 4 },
        { name: "US 11", slug: "us-11", sortOrder: 5 },
        { name: "US 12", slug: "us-12", sortOrder: 6 },
    ];

    const sizeMap = new Map();
    for (const s of sizesData) {
        const inserted = await db.insert(schema.sizes).values(s).onConflictDoNothing().returning();
        if (inserted.length > 0) sizeMap.set(s.slug, inserted[0].id);
        else {
            const existing = await db.query.sizes.findFirst({ where: eq(schema.sizes.slug, s.slug) });
            if (existing) sizeMap.set(s.slug, existing.id);
        }
    }

    // 3. Seed Catalog Base
    console.log("Seeding Catalog Base...");

    const brandsData = [
        { name: "Nike", slug: "nike" },
        { name: "Jordan", slug: "jordan" },
        { name: "Converse", slug: "converse" }
    ];
    const brandMap = new Map();
    for (const b of brandsData) {
        const inserted = await db.insert(schema.brands).values(b).onConflictDoNothing().returning();
        if (inserted.length > 0) brandMap.set(b.slug, inserted[0].id);
        else {
            const existing = await db.query.brands.findFirst({ where: eq(schema.brands.slug, b.slug) });
            if (existing) brandMap.set(b.slug, existing.id);
        }
    }

    const categoriesData = [
        { name: "Shoes", slug: "shoes" },
        { name: "Clothing", slug: "clothing" },
        { name: "Accessories", slug: "accessories" }
    ];
    const categoryMap = new Map();
    for (const c of categoriesData) {
        const inserted = await db.insert(schema.categories).values(c).onConflictDoNothing().returning();
        if (inserted.length > 0) categoryMap.set(c.slug, inserted[0].id);
        else {
            const existing = await db.query.categories.findFirst({ where: eq(schema.categories.slug, c.slug) });
            if (existing) categoryMap.set(c.slug, existing.id);
        }
    }

    // 4. Seed Products
    console.log("Seeding Products...");

    const productNames = [
        "Air Force 1 '07", "Air Max 90", "Dunk Low Retro", "Air Jordan 1 Low", "Zoom Vomero 5",
        "V2K Run", "P-6000", "Air Max Dn", "Air Max 1", "Blazer Mid '77",
        "Cortez", "Air Max 97", "Air Max Plus", "InfinityRN 4", "Invincible 3"
    ];

    // Ensure upload dir
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Get available shoe images
    const sourceDir = path.join(process.cwd(), "public", "shoes");
    let shoeImages: string[] = [];
    if (fs.existsSync(sourceDir)) {
        shoeImages = fs.readdirSync(sourceDir).filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i));
    }

    const nikeBrandId = brandMap.get("nike");
    const shoesCatId = categoryMap.get("shoes");

    for (const name of productNames) {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const genderSlug = Math.random() > 0.5 ? "men" : "women";

        const product = await db.insert(schema.products).values({
            name: name,
            description: `Experience the comfort and style of ${name}. Designed for performance and everyday wear.`,
            categoryId: shoesCatId,
            brandId: nikeBrandId,
            genderId: genderMap.get(genderSlug),
            isPublished: true,
        }).returning();

        const productId = product[0].id;

        // Create Variants
        const randomColors = [...colorMap.keys()].sort(() => 0.5 - Math.random()).slice(0, 2); // 2 random colors

        for (const colorSlug of randomColors) {
            const colorId = colorMap.get(colorSlug);

            for (const [sizeSlug, sizeId] of sizeMap.entries()) {
                const sku = `${slug}-${colorSlug}-${sizeSlug}-${Math.floor(Math.random() * 1000)}`;

                const variant = await db.insert(schema.variants).values({
                    productId,
                    sku,
                    price: (Math.random() * 100 + 50).toFixed(2),
                    colorId,
                    sizeId,
                    inStock: Math.floor(Math.random() * 50),
                }).returning();

                // Add Images (Assign random image to variant or product)
                if (shoeImages.length > 0) {
                    const randomImg = shoeImages[Math.floor(Math.random() * shoeImages.length)];
                    // Copy to uploads
                    const destName = `p-${productId}-${randomImg}`;
                    fs.copyFileSync(path.join(sourceDir, randomImg), path.join(uploadDir, destName));

                    await db.insert(schema.productImages).values({
                        productId,
                        variantId: variant[0].id,
                        url: `/uploads/${destName}`,
                        isPrimary: true,
                        sortOrder: 1
                    });
                }
            }
        }
    }

    console.log("✅ Seeding completed!");
    process.exit(0);
}

main().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
