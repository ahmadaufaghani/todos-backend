import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";


import {
    AllowNull,
    BelongsTo,
    Column, 
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import User from "./User";

@Table({
    tableName: "todos", 
    modelName : "Todo"
})

export default class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true
    })
    declare id: CreationOptional<number>;

    @AllowNull(false)
    @Column
    declare content: string

    @AllowNull(false)
    @Column
    declare status: string

    @ForeignKey(()=>User)
    @Column({
        type: DataType.INTEGER
    })
    declare user_id: number
    
    @BelongsTo(()=>User)
    declare user?: InferAttributes<User>;

    @CreatedAt
    declare created_at: CreationOptional<Date>;

    @UpdatedAt
    declare updated_at: CreationOptional<Date>;
}