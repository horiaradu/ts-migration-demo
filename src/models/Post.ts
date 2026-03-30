import { Model, DataTypes } from "sequelize";
import type {
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
    NonAttribute,
} from "sequelize";
import { sequelize } from "./database.ts";
import { PostStatus } from "../types.ts";
import type { User } from "./User.ts";
import type { Comment } from "./Comment.ts";

export class Post extends Model<
    InferAttributes<Post>,
    InferCreationAttributes<Post>
> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare body: string;
    declare status: PostStatus;
    declare userId: ForeignKey<User["id"]>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    // Association type hints
    declare author?: NonAttribute<User>;
    declare comments?: NonAttribute<Comment[]>;
}

Post.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: DataTypes.STRING, allowNull: false },
        body: { type: DataTypes.TEXT, allowNull: false },
        status: {
            type: DataTypes.ENUM(...Object.values(PostStatus)),
            allowNull: false,
            defaultValue: PostStatus.Draft,
        },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    { sequelize, modelName: "Post" }
);


