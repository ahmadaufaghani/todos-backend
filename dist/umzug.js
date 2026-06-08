"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrator = void 0;
require("dotenv/config");
const umzug_1 = require("umzug");
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("./config"));
const sequelize = new sequelize_1.Sequelize(config_1.default.db);
exports.migrator = new umzug_1.Umzug({
    migrations: {
        glob: ["db/migrations/*.ts", { cwd: __dirname }],
    },
    context: sequelize,
    storage: new umzug_1.SequelizeStorage({
        sequelize,
        tableName: "migrations"
    }),
    logger: console
});
//# sourceMappingURL=umzug.js.map