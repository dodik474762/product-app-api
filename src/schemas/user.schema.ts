import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    roles: string;

    @Prop()
    created_at: Date;

    @Prop()
    updated_at: Date;

    @Prop()
    deleted_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);