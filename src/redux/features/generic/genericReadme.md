# Generic API — Usage

This file documents how to use the generic RTK Query hooks exposed by the `generic` feature.
The hooks are intended to be simple wrappers that accept a small options object and handle requests, caching, and invalidation using tags.

**Hooks Available**

- `useGetAllDataQuery(options)` — fetch a paginated/list resource
- `useGetSingleDataQuery(options)` — fetch a single resource by id
- `useCreateDataMutation()` — create a resource
- `useUpdateDataMutation()` — update a resource by id
- `useDeleteDataMutation()` — delete a resource by id

## Options reference

- `endpoint` (string) — API path (e.g. `/users`). Required for all calls.
- `id` (string | number) — resource id for single, update, delete operations.
- `queryObj` (Array<{name: string, value: any}> | Record<string, any>) — query parameters to append to the URL. You can pass an array of `{name, value}` pairs (used by the generic helpers) or a plain object depending on implementation.
- `body` (object) — request body for create/update.
- `tags` (string[]) — tags to associate with the query response. Use this in queries to label cached data (e.g. `['Users']`).
- `invalidates` (string[]) — tags to invalidate after a mutation completes. Use this in mutations to trigger refetch of relevant queries.

## Examples

Get all data (list)

```ts
const { data, isLoading, isError } = useGetAllDataQuery({
  endpoint: "/users",
  // either array of query pairs or object depending on helper implementation
  queryObj: [
    { name: "page", value: 1 },
    { name: "limit", value: 10 },
    { name: "search", value: "john" },
  ],
  // Tag this response as 'Users' so mutations can invalidate it
  tags: ["Users"],
});
```

Get single resource

```ts
const { data, isLoading, isError } = useGetSingleDataQuery({
  endpoint: "/users",
  id: userId,
  tags: ["Users"],
});
```

Create resource

```ts
const [createData, { isLoading, isSuccess, isError }] = useCreateDataMutation();

await createData({
  endpoint: "/users",
  body: {
    name: "John Doe",
    email: "john@example.com",
  },
  // Invalidate the 'Users' tag so lists/queries tagged with 'Users' refetch
  invalidates: ["Users"],
});
```

Update resource

```ts
const [updateData, { isLoading, isSuccess, isError }] = useUpdateDataMutation();

await updateData({
  endpoint: "/users",
  id: "123",
  body: { name: "John Doe" },
  // Invalidate the tag(s) that should be refreshed after this change
  invalidates: ["Users"],
});
```

Delete resource

```ts
const [deleteData, { isLoading, isSuccess, isError }] = useDeleteDataMutation();

await deleteData({
  endpoint: "/users",
  id: "123",
  invalidates: ["Users"],
});
```

## How tags & invalidation work

- Queries can add `tags` to the cached response. Example: queries that list users should use `tags: ['Users']`.
- Mutations use `invalidates` to list tags that must be invalidated after a successful mutation. Any query that provided the invalidated tag will be refetched automatically by RTK Query.
- Use consistent tag names (e.g. `Users`) across related queries and mutations so cache updates are predictable.

## Tips

- Prefer plural tag names for collections (e.g. `Users`) and singular for specific items if your implementation supports item-level tags (e.g. `User:123`).
- Keep `queryObj` small and predictable so cache keys remain stable.
- Check the network tab or RTK Query DevTools to debug when/why queries refetch.

If you want, I can also add a short TypeScript interface example for the options object used by the generic hooks.
