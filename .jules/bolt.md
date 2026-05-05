## 2024-05-25 - Payload and Query Optimization
**Learning:** Returning full conversation histories on the `getAll` route for websites leads to unnecessary network payload and memory usage, as the frontend only needs `latestCode`, `title`, and metadata for the Dashboard/Home pages. Additionally, querying websites by `user` requires a collection scan without an index.
**Action:** Always select only the necessary fields (`-conversation`) when fetching lists of documents, and ensure fields used in filters (like `user`) are indexed.
## 2025-05-05 - [Optimization] Avoid slice before map in React renders
**Learning:** Using `.slice(start, end).map()` in a React component's render path creates an unnecessary intermediate array allocation. While negligible for small lists, it adds up in high-frequency renders or with many items.
**Action:** Use a manual `for` loop to limit iterations when populating a JSX array, or use a helper function to keep the JSX clean while avoiding the allocation.
