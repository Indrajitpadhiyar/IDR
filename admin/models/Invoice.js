import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    paymentId: {
      type: String,
      unique: true,
      sparse: true, // Allow multiple null/undefined values while enforcing uniqueness for non-null values
    },
    plan: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Paid', 'Pending', 'Refunded'],
      default: 'Paid',
    },
    billingDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;
