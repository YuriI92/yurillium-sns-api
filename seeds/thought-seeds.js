const mongoose = require('mongoose');
const { Thought } = require('../models');

mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yurillium-sns-api')
    .then(() => console.log('Connected to Mongo'))
    .catch(err => console.log(err));


const seedThoughts = [
    {
        thoughtText: 'Adipisci inventore. Cupidatat. Consequuntur quam dolores. Quisquam ab incidunt ex nor laboriosam sit. Velitesse laborum consequuntur elit iste nor eu.',
        username: 'lernantino',
        userId: '62aeadde942c774b33018d65'
    },
    {
        thoughtText: 'Modi minima yet ipsum, for ullamco iste for unde. Voluptatem voluptas sequi for aliquam qui. Nesciunt error ex voluptas natus or magni.',
        username: 'yuri',
        userId: '62aeadde942c774b33018d66'
    },
    {
        thoughtText: 'Aliqua aspernatur for consequatur or culpa adipisci tempor for pariatur. Magna beatae magni consequatur and non for culpa aute. Quasi iste. Illo magnam yet aliquid or suscipit, modi nihil.',
        username: 'jack',
        userId: '62aeadde942c774b33018d68'
    },
    {
        thoughtText: 'Ipsam exercitation for numquam, nostrum consequatur and dolores. Si nostrum or quis sint. Consequuntur. Aute commodi. Nesciunt aliquam enim. Eaque magna, vel. Velitesse.',
        username: 'lernantino',
        userId: '62aeadde942c774b33018d65'
    },
    {
        thoughtText: 'Commodo velitesse for accusantium but enim but aliquip natus. Labore ratione quam omnis eiusmod consequatur architecto. Quasi sint. Minima ea or adipisicing, mollit perspiciatis cillum.',
        username: 'jack',
        userId: '62aeadde942c774b33018d68'
    },
];

const seedDB = async () => {
    await Thought.deleteMany({});
    await Thought.insertMany(seedThoughts);
};

seedDB().then(() => {
    mongoose.connection.close();
});
