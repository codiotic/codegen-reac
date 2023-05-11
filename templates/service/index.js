exports.serviceTemplate = `
import apiSlice from "./ApiSlice";
import { PaginationType } from "src/models/common/PaginationType.model";

export const __SERVICE_NAME__Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    __ENDPOINTS__
  }),
});

export const {
 __HOOKS__
} = __SERVICE_NAME__Api;
`;
