import { sequelize, User } from "../src/models";
import { Role } from "../src/types";

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

afterEach(async () => {
    await User.destroy({ where: {}, truncate: true });
});

describe("User model", () => {
    it("creates a user with default role", async () => {
        const user = await User.create({ name: "Alice", email: "alice@example.com", role: Role.User });
        expect(user.id).toBeDefined();
        expect(user.name).toBe("Alice");
        expect(user.role).toBe(Role.User);
    });

    it("creates a user with admin role", async () => {
        const user = await User.create({ name: "Bob", email: "bob@example.com", role: Role.Admin });
        expect(user.role).toBe(Role.Admin);
    });

    it("enforces unique email", async () => {
        await User.create({ name: "Alice", email: "unique@example.com", role: Role.User });
        await expect(
            User.create({ name: "Alice2", email: "unique@example.com", role: Role.User })
        ).rejects.toThrow();
    });

    it("finds all users", async () => {
        await User.create({ name: "Alice", email: "alice@example.com", role: Role.User });
        await User.create({ name: "Bob", email: "bob@example.com", role: Role.User });
        const users = await User.findAll();
        expect(users).toHaveLength(2);
    });
});
