import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";

import bcrypt from "bcrypt";

import {
    AllowNull,
    BeforeCreate,
    BeforeUpdate,
    Column, 
    CreatedAt,
    DataType,
    HasMany,
    Model,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import Todo from "./Todo";

@Table({
    tableName: "users",
    modelName: "User"
})

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true
    })
    declare id: CreationOptional<number>;

    @AllowNull(false)
    @Column
    declare username: string;


    @AllowNull(false)
    @Column
    declare password: string;

    @HasMany(()=>Todo)
    declare user?: InferAttributes<Todo>[];

    @CreatedAt
    declare created_at: CreationOptional<Date>;

    @UpdatedAt
    declare updated_at: CreationOptional<Date>;

    @BeforeCreate
    @BeforeUpdate
    static async hashPassword(instance: User) {
        if(instance.password && (instance.changed("password") || instance.isNewRecord)) {
            instance.password = await bcrypt.hash(instance.password, 12);
        }
    }


    toJSON(): any
    {
        return {
            ...this.get(),
            password: undefined,
            created_at: undefined,
            updated_at: undefined,
        }
    }
}