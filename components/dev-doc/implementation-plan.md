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



Horizontal Portfolio UX Refinement Plan
Goal Description
Enhance the existing
CollectionScroll.tsx
 component to match the "Premium UX" instructions provided by the user. Key improvements include visual indicators for scrolling (peeking next card, arrows, text hints), optimized mobile experience, and refined animations.

User Review Required
IMPORTANT

Peeking Card Logic: To show a "faded preview of the next card", I will adjust the panel width from w-screen to roughly w-[85vw] or w-[90vw] (responsive) so the next card is visible on the edge. This changes the "full screen" feel slightly but improves navigability as requested.

Proposed Changes
Components
[MODIFY]
CollectionScroll.tsx
Structure: Change collection-panel width to allow the next card to peek.
Desktop: w-[85vw] (approx) or keep w-screen and add a right-margin mask/overlay? "Show a small part of the next image" usually implies standard carousel behavior where width < 100%. w-[90vw] is safer.
Visual Indicators:
Add "Scroll →" text at bottom-left (absolute positioned or fixed within the pinned section).
Add Hover-only Arrow Icons (Prev/Next) for desktop.
Add Mobile specific hint "Swipe to explore →".
Loading: Add loading="lazy" to images.
Animation: Ensure smooth friction/scrubbing.
Styles
Ensure Tailwind classes for eko-gold, eko-black are consistent (no new files needed, just verification).
Verification Plan
Automated Tests
No existing automated UI tests found.
Will rely on Browser Verification.
Manual Verification
Desktop:
Scroll down to the Portfolio section.
Verify the horizontal scroll triggers automatically.
Check: Is the next card slightly visible on the right?
Check: Does "Scroll →" appear at bottom-left?
Check: Do arrows appear on hover?
Check: Does the "View All Collections" panel appear at the end?
Check: Does "View All" button link to /collections?
Mobile (via Browser DevTools):
Verify vertical scroll converts to horizontal swipe/scroll naturally.
Check: Is text hint "Swipe to explore →" visible?
Check: Is responsiveness intact (images stack or resize correctly)?
