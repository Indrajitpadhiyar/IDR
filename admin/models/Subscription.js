import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    plan: {
      type: String,
      enum: ['Basic', 'Professional', 'Enterprise', 'Business'],
      default: 'Basic',
    },
    price: {
      type: Number,
      required: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Expired', 'Suspended'],
      default: 'Active',
    },
    storageLimit: {
      type: Number, // In GB
      default: 100,
    },
    storageUsed: {
      type: Number, // In GB
      default: 0,
    },
    bandwidthLimit: {
      type: String,
      default: 'Unlimited',
    },
  },
  { timestamps: true }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
