let mongoose = require("mongoose");
require("dotenv").config();

let connection = mongoose.connect(`mongodb+srv://mahapatrak898kkm:Xqj7Sq3ugRLoZrHk@evaluation.l4qlzac.mongodb.net/`);

module.exports={connection}