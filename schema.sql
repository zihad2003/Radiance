-- Radiance Beauty Salon - Cloudflare D1 Schema

CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  image_main TEXT,
  image_thumbnail TEXT,
  description TEXT,
  in_stock BOOLEAN DEFAULT 1,
  rating REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  service_id TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  status TEXT DEFAULT 'pending',
  total_amount INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  email TEXT,
  total_bookings INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE saved_looks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_phone TEXT,
  look_name TEXT,
  products_json TEXT, -- JSON array of product IDs
  image_data TEXT, -- Base64 or URL
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
