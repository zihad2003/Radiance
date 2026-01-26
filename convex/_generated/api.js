/**
 * Temporary API stub.
 * These will be overwritten by 'npx convex dev' once the user is logged in.
 * Setting these to null/undefined ensures useQuery(api.products.list || null) 
 * skips execution instead of trying to hit a non-existent endpoint.
 */
export const api = {
    products: {
        list: undefined,
        getByCategory: undefined,
        addProduct: undefined,
        bulkAdd: undefined,
    }
};
