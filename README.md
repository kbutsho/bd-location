# Bangladesh District & Police Station API

This is a simple API providing information about **Bangladesh districts** and their **police stations**. The API is built with **Next.js App Router** and uses a JSON data source.

## Live URLs

- Get all districts: [https://kbutsho-bd-location.vercel.app/api/district](https://kbutsho-bd-location.vercel.app/api/district)  
- Get a specific district by ID (with police stations): [https://kbutsho-bd-location.vercel.app/api/district/1](https://kbutsho-bd-location.vercel.app/api/district/1)

---

## API Endpoints

### 1. Get All Districts

**URL:** `/api/district`  
**Method:** `GET`  
**Query Parameter (optional):**  
- `search`: Filter districts or police stations by name (English or Bangla).  

**Example:**  
```http
GET https://kbutsho-bd-location.vercel.app/api/district?search=dhaka
