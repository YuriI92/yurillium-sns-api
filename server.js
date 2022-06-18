const app = require('express').express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yurillium-sns-api');

// to log db queries
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on PORT ${PORT}`));
