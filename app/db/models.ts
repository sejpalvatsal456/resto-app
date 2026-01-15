import { model, models, Schema } from "mongoose";

const RestaurantSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  city: { type: String, require: true },
  address: { type: String, require: true },
  contact: { type: Number, require: true },
}, { timestamps: true });

export const Restaurant = models.restaurants || model("restaurants", RestaurantSchema);

const ItemSchema = new Schema({
  restId: { type: Schema.Types.ObjectId, ref: "Restaurant", require: true },
  name: {type: String, require: true},
  imgUrl: { type: String, require: true },
  price: { type: Number, require: true },
  desc: { type: String, require: true }
}, { timestamps: true });

export const Item = models.items || model("items", ItemSchema);

const UserSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  city: { type: String, require: true },
  address: { type: String, require: true },
  contact: { type: Number, require: true }
}, { timestamps: true });

export const User = models.users || model("users", UserSchema);