# Recent Search Migration Guide

## Database Migration

Setelah menambahkan model `RecentSearch` ke schema Prisma, jalankan command berikut untuk membuat dan apply migration:

### 1. Generate Migration

```bash
cd backend
npx prisma migrate dev --name add_recent_search_table
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. (Optional) Check Migration Status

```bash
npx prisma migrate status
```

## Database Structure

Tabel `recent_search` yang akan dibuat:

```sql
CREATE TABLE `recent_search` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `query` VARCHAR(255) NOT NULL,
  `resultCount` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `recent_search_userId_idx` (`userId`),
  INDEX `recent_search_createdAt_idx` (`createdAt`),
  CONSTRAINT `recent_search_userId_fkey` 
    FOREIGN KEY (`userId`) REFERENCES `users`(`id`) 
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Features

- ✅ Auto-delete on user deletion (CASCADE)
- ✅ Index on userId for fast queries
- ✅ Index on createdAt for sorting
- ✅ Stores query string (max 255 chars)
- ✅ Stores result count for display
- ✅ Automatic timestamp tracking

## Testing Migration

### Test Queries:

```sql
-- Check if table exists
SHOW TABLES LIKE 'recent_search';

-- View table structure
DESCRIBE recent_search;

-- Test insert
INSERT INTO recent_search (userId, query, resultCount) 
VALUES (1, 'kunyit asam', 5);

-- Test select
SELECT * FROM recent_search WHERE userId = 1 ORDER BY createdAt DESC;
```

## Rollback (if needed)

Jika ada masalah dan perlu rollback:

```bash
npx prisma migrate resolve --rolled-back [migration_name]
```

Atau hapus migration file dan reset:

```bash
npx prisma migrate reset
```

⚠️ **Warning:** `migrate reset` akan menghapus semua data!
