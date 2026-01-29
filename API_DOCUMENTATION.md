# Radiance Salon - REST API Documentation

The Radiance backend is powered by Convex but exposes a standard RESTful interface for external integrations.

**Base URL:** `https://your-deployment-name.convex.site` (Note: `.site` not `.cloud`)

---

## 🛍 Products

### List Products
- **Endpoint:** `GET /api/products`
- **Response:** `200 OK`
- **Body:** Array of Product objects.

### Get Product
- **Endpoint:** `GET /api/products/get?id=lips-01`
- **Response:** `200 OK` or `404 Not Found`

---

## 📝 Orders

### Create Order
- **Endpoint:** `POST /api/orders`
- **Request Body:**
```json
{
  "total": 1850,
  "items": [...],
  "delivery": {
    "fullName": "Jane Doe",
    "phone": "017XXXXXXXX",
    "address": "Banani, Dhaka"
  },
  "method": "cod"
}
```
- **Response:** `201 Created`
```json
{
  "success": true,
  "id": "...",
  "orderId": "REST-123456789"
}
```

---

## 📅 Bookings

### Create Booking
- **Endpoint:** `POST /api/bookings`
- **Request Body:**
```json
{
  "service": "Bridal Makeup",
  "date": "2026-02-14",
  "time": "10:00 AM",
  "customer": {
    "name": "Jane Doe",
    "phone": "017XXXXXXXX",
    "address": "Home"
  }
}
```
- **Response:** `201 Created`

---

## 👤 Users

### Get Profile
- **Endpoint:** `GET /api/profile?phone=017XXXXXXXX`
- **Response:** `200 OK` with User object or `404 Not Found`.

---

## 🛡 Security & Errors

- **CORS:** Enabled for all origins (`*`) by default for this demo.
- **Error Codes:**
  - `400 Bad Request`: Missing fields or invalid JSON.
  - `404 Not Found`: Resource does not exist.
  - `500 Internal Server Error`: Backend logic failure.
