import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		price: { type: Number, required: true, trim: true },
		description: { type: String, required: true, trim: true },
		image: { data: Buffer, contentType: String },
		sold: { type: Number, default: 0 },
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		quantity: { type: Number, required: true },
		shipping: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
