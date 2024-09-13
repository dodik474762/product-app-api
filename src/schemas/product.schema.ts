import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product{
    @Prop()
    created_by: string;

    @Prop()
    product_code: string;

    @Prop()
    product_name: string;
    
    @Prop()
    product_price: string;
    
    @Prop()
    waranty_date: Date;

    @Prop()
    created_at: Date;

    @Prop()
    updated_at: Date;

    @Prop()
    deleted_at: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);