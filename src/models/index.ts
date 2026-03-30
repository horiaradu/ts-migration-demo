// Barrel export — importing from here triggers all model definitions
// and the associations defined inside User.ts and Post.ts.
export { sequelize } from "./database.ts";
export { User } from "./User.ts";
export { Post } from "./Post.ts";
export { Comment } from "./Comment.ts";
