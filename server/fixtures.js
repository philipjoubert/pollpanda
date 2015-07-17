// run this when the meteor app is started
Meteor.startup(function() {

  // if there are no polls available create sample data
  if (Polls.find().count() === 0) {

    // create sample polls
    var samplePolls = [
      {
        question: 'Is Meteor awesome?',
        choices: [
          { text: 'Of course!', votes: 3 },
          { text: 'Eh', votes: 5 },
          { text: 'No. I like plain JS', votes: 2 }
        ],
        respondents: [],
        responses: 0
      },
      {
        question: 'Is CSS3 Flexbox the greatest thing since sliced cows?',
        choices: [
          { text: '100% yes', votes: 1 },
          { text: '200% yes', votes: 2 },
          { text: '300% yes', votes: 1 }
        ],
        respondents: [],
        responses: 0
      },
      {
        question: 'Do cows eat?',
        choices: [
          { text: '100% yes', votes: 22 },
          { text: '200% yes', votes: 10 },
          { text: '300% yes', votes: 42 }
        ],
        respondents: [],
        responses: 0
      },
      {
        question: 'Is Michael Bay the best?',
        choices: [
          { text: '100% yes', votes: 2 },
          { text: '200% yes', votes: 1 },
          { text: '300% yes', votes: 3 }
        ],
        respondents: [],
        responses: 0
      },
      {
        question: 'How many kittens?',
        choices: [
          { text: '100% yes', votes: 3 },
          { text: '200% yes', votes: 2 },
          { text: '300% yes', votes: 1 }
        ],
        respondents: [],
        responses: 0
      },
      {
        question: 'Question 10 is good?',
        choices: [
          { text: '100% yes', votes: 3 },
          { text: '200% yes', votes: 53 },
          { text: '300% yes', votes: 15 }
        ],
        respondents: [],
        responses: 0
      }
    ];

    // loop over each sample poll and insert into database
    _.each(samplePolls, function(poll) {
      Polls.insert(poll);
    });

  }

});