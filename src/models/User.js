import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcryptjs';

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      index: true,
      type: String,
      required: true,
      validate: {
        validator: (username) => User.dontExist({ username }),
        message: ({ value }) => `Username ${value} has already been taken.`,
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (email) => User.dontExist({ email }),
        message: ({ value }) => `Email ${value} has already been taken.`,
      },
    },
    password: {
      index: true,
      type: String,
      required: true,
    },
    aadhar: {
      type: Number,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    phone2: {
      type: Number,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    orgName: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    accountName: {
      type: String,
      required: false,
    },
    accountNumber: {
      type: Number,
      required: false,
    },
    ifsc: {
      type: String,
      required: false,
    },
    affiliateId: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 12);
  }
});

UserSchema.statics.dontExist = async function (options) {
  return (await this.where(options).countDocuments()) === 0;
};

UserSchema.methods.isMatch = async function (password) {
  return await compare(password, this.password);
};

const User = model('users', UserSchema);

export default User;
