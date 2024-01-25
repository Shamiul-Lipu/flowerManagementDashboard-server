import { Types } from "mongoose";

export interface IFlowerSales {
  sellerUserId: Types.ObjectId;
  productId: Types.ObjectId;
  buyer: string;
  saleDate: Date;
  quantitySold: number;
  totalAmount: number;
}
