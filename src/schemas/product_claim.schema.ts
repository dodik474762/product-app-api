import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type ProductClaimDocument = HydratedDocument<ProductClaim>;

@Schema()
export class ProductClaim{
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
    status: String;
    
    @Prop()
    approved_date: Date;

    @Prop()
    created_at: Date;

    @Prop()
    updated_at: Date;

    @Prop()
    deleted_at: Date;
}

export const ProductClaimSchema = SchemaFactory.createForClass(ProductClaim);