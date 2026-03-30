import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    NonAttribute,
} from "sequelize";
import { sequelize } from "./database";
import { Role } from "../types";
// Circular: User imports Post and Comment to define its associations
import { Post } from "./Post";
import { Comment } from "./Comment";

export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare role: Role;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    // Association type hints
    declare posts?: NonAttribute<Post[]>;
    declare comments?: NonAttribute<Comment[]>;
}

User.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        role: {
            type: DataTypes.ENUM(...Object.values(Role)),
            allowNull: false,
            defaultValue: Role.User,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    { sequelize, modelName: "User" }
);

// Associations defined here — creates circular dependency:
// User.ts → Post.ts → User.ts
User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "author" });

User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(User, { foreignKey: "userId", as: "author" });
