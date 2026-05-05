## 2024-05-25 - Payload and Query Optimization
**Learning:** Returning full conversation histories on the `getAll` route for websites leads to unnecessary network payload and memory usage, as the frontend only needs `latestCode`, `title`, and metadata for the Dashboard/Home pages. Additionally, querying websites by `user` requires a collection scan without an index.
**Action:** Always select only the necessary fields (`-conversation`) when fetching lists of documents, and ensure fields used in filters (like `user`) are indexed.
