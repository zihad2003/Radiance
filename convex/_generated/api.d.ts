/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as ai from "../ai.js";
import type * as aiChat from "../aiChat.js";
import type * as aiUtils from "../aiUtils.js";
import type * as auth from "../auth.js";
import type * as bookings from "../bookings.js";
import type * as chat from "../chat.js";
import type * as fixImages from "../fixImages.js";
import type * as forms from "../forms.js";
import type * as http from "../http.js";
import type * as orders from "../orders.js";
import type * as products from "../products.js";
import type * as recommendations from "../recommendations.js";
import type * as seed from "../seed.js";
import type * as seedExtended from "../seedExtended.js";
import type * as services from "../services.js";
import type * as skinAnalysis from "../skinAnalysis.js";
import type * as stylists from "../stylists.js";
import type * as tutorials from "../tutorials.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  ai: typeof ai;
  aiChat: typeof aiChat;
  aiUtils: typeof aiUtils;
  auth: typeof auth;
  bookings: typeof bookings;
  chat: typeof chat;
  fixImages: typeof fixImages;
  forms: typeof forms;
  http: typeof http;
  orders: typeof orders;
  products: typeof products;
  recommendations: typeof recommendations;
  seed: typeof seed;
  seedExtended: typeof seedExtended;
  services: typeof services;
  skinAnalysis: typeof skinAnalysis;
  stylists: typeof stylists;
  tutorials: typeof tutorials;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
