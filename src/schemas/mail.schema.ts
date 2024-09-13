import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import { HydratedDocument } from "mongoose";


// export type MailsDocument = HydratedDocument<Mail>;

@Schema()
export class Mail{
    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    date: string;
    
    @Prop()
    description: string;

    @Prop()
    created_at: Date;

    @Prop()
    updated_at: Date;

    @Prop()
    deleted_at: Date;
}

export const MailSchema = SchemaFactory.createForClass(Mail);