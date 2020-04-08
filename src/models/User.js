import { Schema, model } from "mongoose";
import { hash, compare } from "bcryptjs";

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
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
      type: String,
      required: true,
    },
    userKey: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 12);
  }
  this.userKey = await hash(this.name, 12);
});

UserSchema.pre("findOneAndUpdate", async function () {
  if (this._update.password) {
    this._update.password = await hash(this._update.password, 12);
    // Change the user key
    const user = await this.model.findOne(this.getQuery());
    this._update.userKey = await hash(user.name, 12);
  }
});

UserSchema.statics.dontExist = async function (options) {
  return (await this.where(options).countDocuments()) === 0;
};

UserSchema.methods.isMatch = async function (password) {
  return await compare(password, this.password);
};

const User = model("users", UserSchema);

export default User;
