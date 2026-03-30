import request from "supertest";
import { sequelize, User, Post, Comment } from "../src/models/index.ts";
import { createApp } from "../src/app.ts";
import { Role, PostStatus } from "../src/types.ts";

const app = createApp();

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

afterEach(async () => {
    await Comment.destroy({ where: {} });
    await Post.destroy({ where: {} });
    await User.destroy({ where: {} });
});

describe("POST /posts", () => {
    it("creates a post", async () => {
        const user = await User.create({ name: "Alice", email: "alice@example.com", role: Role.User });
        const res = await request(app)
            .post("/posts")
            .send({ title: "Hello World", body: "First post", userId: user.id });
        expect(res.status).toBe(201);
        expect(res.body.title).toBe("Hello World");
        expect(res.body.status).toBe(PostStatus.Draft);
    });
});

describe("GET /posts", () => {
    it("returns posts with author and comments", async () => {
        const user = await User.create({ name: "Alice", email: "alice@example.com", role: Role.User });
        const post = await Post.create({ title: "Hello", body: "World", userId: user.id, status: PostStatus.Published });
        await Comment.create({ body: "Nice post", userId: user.id, postId: post.id });

        const res = await request(app).get("/posts");
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].author.name).toBe("Alice");
        expect(res.body[0].comments).toHaveLength(1);
    });
});
