const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    userContacts: {
      type: [
        {
          contactName: {
            type: String,
            default: "NewGroup",

          },
          recipients: [{ type: String }],
          messages: [
            {
              sender: { type: String },
              content: { type: String },
              type:{ type: String },
              locn:{ type: String,
                default: "", },
            },
          ],
          isGroupChat: {
            type: Boolean,
            default: false,
          },
        },
      ],
      default: [],
      
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
