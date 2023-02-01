const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  games_played: Number,
  games_won: Number,
  high_score: Number,
  knockouts: Number,
  // friends_list: [mongoose.Schema.Types.ObjectId],
  avatar: String,
  // image_url
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);