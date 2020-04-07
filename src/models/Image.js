import { Schema, model } from 'mongoose';

const ImageSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  profilePicture: {
    type: String,
    required: true,
  },
});

export default model('images', ImageSchema);
