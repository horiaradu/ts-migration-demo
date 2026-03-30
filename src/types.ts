// 'as const' objects instead of enums — Node's type stripping cannot handle
// enums because they generate runtime JavaScript code (an IIFE that builds
// an object). 'as const' is purely a type-level construct: Node strips it
// and nothing remains at runtime.

export const Role = {
    Admin: "admin",
    User: "user",
    Moderator: "moderator",
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const PostStatus = {
    Draft: "draft",
    Published: "published",
    Archived: "archived",
} as const;
export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus];
