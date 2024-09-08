const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, default: 0 },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
