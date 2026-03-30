// TypeScript enums — these will be a problem for Node's type stripping later.
// Node's built-in type stripping does not support enums because they generate
// runtime JavaScript code (not just type annotations).

export enum Role {
    Admin = "admin",
    User = "user",
    Moderator = "moderator",
}

export enum PostStatus {
    Draft = "draft",
    Published = "published",
    Archived = "archived",
}
