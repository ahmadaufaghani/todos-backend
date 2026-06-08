import {DataTypes, Sequelize} from 'sequelize';
import type { Migration } from '../../umzug';

export const up: Migration = async ({context: sequelize}) => {
    await sequelize.getQueryInterface().createTable("users", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username : {
            type: DataTypes.STRING,
            allowNull: false
        },
        password : {
            type: DataTypes.STRING,
            allowNull : false,
            unique: true
        },
        created_at : {
            type: DataTypes.DATE,
            allowNull : false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        updated_at : {
            type: DataTypes.DATE,
            allowNull : false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        }
    })
};

export const down: Migration = async ({context: sequelize})  => {
    await sequelize.getQueryInterface().dropTable("users");
};
