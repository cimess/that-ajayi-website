Admin Content Upload & Collection Scroll Implementation Plan
Goal Description
Allow the admin to upload collection images and quotes via the dashboard. These uploads will be stored in the backend (using Cloudinary for images) and displayed on the public "Collection Scroll" component.

User Review Required
IMPORTANT

This requires installing cloudinary, multer, and multer-storage-cloudinary in mern-auth-backend. I will assume standard Cloudinary configuration is available or reuse the one in
config/cloudinary.js
.

Proposed Changes
Backend (mern-auth-backend)
[NEW]
models/Collection.js
Schema for Collection Item:
image: String (URL)
title: String
subtitle: String (optional)
quote: String (or description)
tags: [String]
affiliateLink: String (optional)
[NEW]
routes/collection.js
POST /: Upload image (multer -> cloudinary) and create collection item (protected).
GET /: Retrieve all collection items.
DELETE /:id: Delete collection item.
[MODIFY]
server.js
Import and use collectionRoutes at /api/collections.
[MODIFY]
package.json
Add dependencies: cloudinary, multer, multer-storage-cloudinary.
Frontend (eko-couture - Copy)
[MODIFY]
context/DataContext.tsx
Fetch collections from /api/collections on mount.
addCollectionItem
 should POST to /api/collections (handling FormData for image file).
deleteCollectionItem
 should DELETE to /api/collections/:id.
[MODIFY]
pages/Admin/Dashboard.tsx
Add "Upload Collection" form (Image, Title, Quote/Description, Tags).
Use
addCollectionItem
 from context.
[MODIFY]
types.ts
Update
CollectionItem
 interface if needed (to match backend model).
Verification Plan
Automated Tests
None planned for this iteration (no test framework setup visible/requested).
Manual Verification
Backend: Check if server starts with new routes. Use curl/Postman to test GET/POST (if possible).
Frontend:
Build and run.
Go to Admin Dashboard.
Upload an image and quote.
Verify it appears in the list.
Go to Homepage.
Verify the "Collection Scroll" shows the new item.
