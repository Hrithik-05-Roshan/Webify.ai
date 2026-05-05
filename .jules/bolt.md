## 2025-05-05 - [Optimization] Avoid slice before map in React renders
**Learning:** Using `.slice(start, end).map()` in a React component's render path creates an unnecessary intermediate array allocation. While negligible for small lists, it adds up in high-frequency renders or with many items.
**Action:** Use a manual `for` loop to limit iterations when populating a JSX array, or use a helper function to keep the JSX clean while avoiding the allocation.
