const connection = require('../config/connection');
const { Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing Thoughts
  await Thought.deleteMany({});

  // Drop existing Users
  await User.deleteMany({});


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

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
