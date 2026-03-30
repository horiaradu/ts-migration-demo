// Barrel export — importing from here triggers all model definitions
// and the associations defined inside User.ts and Post.ts.
export { sequelize } from "./database";
export { User } from "./User";
export { Post } from "./Post";
export { Comment } from "./Comment";
