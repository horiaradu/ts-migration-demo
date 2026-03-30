import { Model, DataTypes } from "sequelize";
import type {
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
    NonAttribute,
} from "sequelize";
import { sequelize } from "./database.ts";
// Circular: Comment imports User and Post
import { User } from "./User.ts";
import { Post } from "./Post.ts";

export class Comment extends Model<
    InferAttributes<Comment>,
    InferCreationAttributes<Comment>
> {
    declare id: CreationOptional<number>;
    declare body: string;
    declare userId: ForeignKey<User["id"]>;
    declare postId: ForeignKey<Post["id"]>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    // Association type hints
    declare author?: NonAttribute<User>;
    declare post?: NonAttribute<Post>;
}

Comment.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        body: { type: DataTypes.TEXT, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        postId: { type: DataTypes.INTEGER, allowNull: false },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    { sequelize, modelName: "Comment" }
);

User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(User, { foreignKey: "userId", as: "author" });
