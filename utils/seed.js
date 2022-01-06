const connection = require('../config/connection');
const { Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');



  const users = [
    { username: "Alexis123", email: "mastroalexis@gmail.com" },
    { username: "Bonnie10", email: "bonniethedog@gmail.com" },
    { username: "Reign18", email: "reign@gmail.com" },
    { username: "Tom2021", email: "tom2020@gmail.com" },
    { username: "Tim2022", email: "timtam@gmail.com" },
    { username: "AvalonM", email: "avalonm@gmail.com" },
  ];

  const thoughts = [
    {
      thoughtText: "Happy New Year!",
      username: "Alexis123",
      reactions: [{ reactionBody: "HNY!!", username: "Tim2022" }],
    },
    {
      thoughtText: "Should I buy the shoes?",
      username: "AvalonM",
      reactions: [
        { reactionBody: "100% you should!", username: "Reign18" },
        { reactionBody: "Ok, DONE", username: "AvalonM" },
      ],
    },
    {
      thoughtText: "What would you do if you won the Lotto tomorrow?",
      username: "Tom2021",
      reactions: [
        { reactionBody: "Book a ticket out of here!", username: "Bonnie10" },
      ],
    },
  ];

  // Drop existing Thoughts
  await Thought.deleteMany({});

  // Drop existing Users
  await User.deleteMany({});
  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  let user;
  let newThought;
  for (let thought of thoughts) {
    console.log("Searching for ", thought.username);
    user = await User.findOne({ username: thought.username });
    if (!user) {
      console.log("something went wrong");
      exit();
    } else {
      console.log("Found", user.username, user.thoughts);
    }
    newThought = await Thought.collection.insertOne(thought);

    await user.thoughts.push(newThought.insertedId);
    try {
      await user.save();
      console.log("saved", user);
    } catch (error) {
      console.error(error);
    }
  };
  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
