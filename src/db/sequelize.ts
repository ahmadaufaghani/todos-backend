import {Sequelize} from "sequelize-typescript";
import {Options} from "sequelize";
import config from "../config";

const sequelize = new Sequelize({
    ...(config.db as Options),
    models: [__dirname + '/../models']
});
