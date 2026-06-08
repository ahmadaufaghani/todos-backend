"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const sequelize_1 = require("sequelize");
const up = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable("users", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        created_at: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP")
        },
        updated_at: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP")
        }
    });
};
exports.up = up;
const down = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable("users");
};
exports.down = down;
//# sourceMappingURL=2026.06.08T02.46.55.users.table.js.map