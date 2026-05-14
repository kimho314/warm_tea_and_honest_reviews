const fs = require('fs');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');
const mammoth = require('mammoth');

async function migrate() {
    const uri = "mongodb+srv://hoseopi:password1234!@cluster0.5b3qylf.mongodb.net/?appName=Cluster0";
    const dbName = "lotus";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db(dbName);

        const usersColl = db.collection('users');
        const categoriesColl = db.collection('categories');
        const reviewsColl = db.collection('book_reviews');

        // 1. Create Default Admin User
        let adminUser = await usersColl.findOne({ username: 'admin' });
        if (!adminUser) {
            const result = await usersColl.insertOne({
                username: 'admin',
                password: 'password', // In real app, this should be hashed
                role: 'ROLE_ADMIN',
                createdAt: new Date(),
                updatedAt: new Date(),
                _class: 'com.warmtea.reviews.entity.UserEntity'
            });
            adminUser = { _id: result.insertedId, username: 'admin' };
            console.log("Admin user created");
        } else {
            console.log("Admin user already exists");
        }

        // 2. Migrate Categories
        const categoriesJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/category.json'), 'utf8'));
        const categoryMap = {}; // name -> ObjectId
        for (const catName of categoriesJson) {
            let cat = await categoriesColl.findOne({ name: catName });
            if (!cat) {
                const result = await categoriesColl.insertOne({
                    name: catName,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    _class: 'com.warmtea.reviews.entity.CategoryEntity'
                });
                categoryMap[catName] = result.insertedId;
                console.log(`Category created: ${catName}`);
            } else {
                categoryMap[catName] = cat._id;
                console.log(`Category exists: ${catName}`);
            }
        }

        // 3. Migrate Reviews
        const reviewsJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/reviews.json'), 'utf8'));
        for (const review of reviewsJson) {
            console.log(`Processing review: ${review.title}`);

            // Parse docx for contents
            let contents = "";
            const docxPath = path.join(__dirname, '../public/reviews', review.file);
            if (fs.existsSync(docxPath)) {
                try {
                    const result = await mammoth.convertToHtml({ path: docxPath });
                    contents = result.value;
                } catch (err) {
                    console.error(`Error parsing docx ${review.file}:`, err);
                }
            } else {
                console.warn(`Docx file not found: ${docxPath}`);
            }

            // Map categories string to list
            const reviewCategories = review.category ? review.category.split(',').map(c => c.trim()) : [];

            // Slugify utility (simplified)
            const slugify = (text) => {
                return text.toString().toLowerCase()
                    .replace(/\s+/g, '-')           // Replace spaces with -
                    .replace(/[^\u0000-\u007F]/g, c => { // Handle non-ASCII (simplified)
                        const chars = {'ğ':'g','ü':'u','ş':'s','ı':'i','ö':'o','ç':'c'};
                        return chars[c] || c;
                    })
                    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                    .trim();                        // Trim
            };

            const bookReviewEntity = {
                adminUserId: adminUser._id,
                title: review.title,
                slug: review.slug || slugify(review.title),
                author: review.author,
                rating: review.rating,
                page: review.page,
                language: review.language,
                categories: reviewCategories,
                publishedAt: review.publishedAt ? new Date(review.publishedAt) : null,
                coverImage: review.cover,
                imageUrl: `/covers/${review.cover}`, // Matching frontend pattern
                contents: contents,
                excerpt: review.excerpt || "",
                createdAt: review.createdAt ? new Date(review.createdAt) : new Date(),
                updatedAt: new Date(),
                _class: 'com.warmtea.reviews.entity.BookReviewEntity' // Add _class for Spring Data
            };

            // Check if already exists by slug
            const existingReview = await reviewsColl.findOne({ slug: bookReviewEntity.slug });
            if (existingReview) {
                await reviewsColl.updateOne({ _id: existingReview._id }, { $set: bookReviewEntity });
                console.log(`Updated review: ${review.title}`);
            } else {
                await reviewsColl.insertOne(bookReviewEntity);
                console.log(`Inserted review: ${review.title}`);
            }
        }

        console.log("Migration completed successfully");

    } catch (err) {
        console.error("Migration failed:", err);
    } finally {
        await client.close();
    }
}

migrate();
