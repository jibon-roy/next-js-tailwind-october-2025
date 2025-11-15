/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi, ApiTagTypes } from "../../api/baseApi";

type TagConfig = ApiTagTypes | { type: ApiTagTypes; id?: string | number };

interface GenericQueryParams {
  endpoint: string;
  queryObj?: any[];
  tags: TagConfig[];
}

interface GenericMutationParams {
  endpoint: string;
  body?: any;
  id?: string | number;
  invalidates: TagConfig[];
}

const genericApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all data with dynamic tags
    getAllData: builder.query({
      query: (data: GenericQueryParams) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: data.endpoint,
          method: "GET",
          params,
        };
      },
      providesTags: (result, error, arg) => {
        return arg.tags;
      },
    }),

    // get single data
    getSingleData: builder.query({
      query: (data: GenericQueryParams & { id: string | number }) => ({
        url: `${data.endpoint}/${data.id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => {
        const baseTags = arg.tags;
        return [
          ...baseTags,
          ...baseTags.map((tag) =>
            typeof tag === "string"
              ? { type: tag as ApiTagTypes, id: arg.id }
              : tag
          ),
        ];
      },
    }),

    // Create data (POST) with dynamic tag invalidation
    createData: builder.mutation({
      query: (data: GenericMutationParams) => ({
        url: data.endpoint,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: (result, error, arg) => {
        return arg.invalidates;
      },
    }),

    // Update data (PATCH) with dynamic tag invalidation
    updateData: builder.mutation({
      query: (data: GenericMutationParams) => ({
        url: `${data.endpoint}/${data.id}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: (result, error, arg) => {
        const baseTags = arg.invalidates;
        return [
          ...baseTags,
          ...baseTags.map((tag) =>
            typeof tag === "string"
              ? { type: tag as ApiTagTypes, id: arg.id }
              : tag
          ),
        ];
      },
    }),

    // Delete data with dynamic tag invalidation
    deleteData: builder.mutation({
      query: (data: GenericMutationParams) => ({
        url: `${data.endpoint}/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => {
        const baseTags = arg.invalidates;
        return [
          ...baseTags,
          ...baseTags.map((tag) =>
            typeof tag === "string"
              ? { type: tag as ApiTagTypes, id: arg.id }
              : tag
          ),
        ];
      },
    }),
  }),
});

export const {
  useGetAllDataQuery,
  useGetSingleDataQuery,
  useCreateDataMutation,
  useUpdateDataMutation,
  useDeleteDataMutation,
} = genericApi;
