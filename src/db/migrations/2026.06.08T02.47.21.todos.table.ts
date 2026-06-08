import {DataTypes, Sequelize} from 'sequelize';
import type { Migration } from '../../umzug';

export const up: Migration = async ({context: sequelize}) => {
    await sequelize.getQueryInterface().createTable("todos", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        content : {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id : {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
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
    await sequelize.getQueryInterface().dropTable("todos");
};
