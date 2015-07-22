// run this when the meteor app is started
Meteor.startup(function() {


  // if there are no polls available create sample data
  if (Polls.find().count() === 0) {

    var tomId = Meteor.users.insert({
      profile: { name: "Tom Coleman"}
    });

    var tom = Meteor.users.findOne(tomId);

    var applesId = Surveys.insert({
      title: 'About them apples',
      userId: tom._id,
      author: tom.profile.name,
      questionsCount: 0
    });

    var apples = Surveys.findOne(applesId);

    var pearsId = Surveys.insert({
      title: 'I pear you to try',
      userId: tom._id,
      author: tom.profile.name,
      questionsCount: 0
    });

    var pears = Surveys.findOne(pearsId);

    // create sample polls
    var samplePolls =[
      {
        surveyId: apples._id,
        question: 'Is Meteor awesome?',
        choices: [
          { text: 'Of course!', votes: 3 },
          { text: 'Eh', votes: 5 },
          { text: 'No. I like plain JS', votes: 2 }
        ],
        respondents: [tomId],
        responses: 10,
        order: 3
      },
      {
        surveyId: apples._id,
        question: 'Is CSS3 Flexbox the greatest thing since sliced cows?',
        choices: [
          { text: '100% yes', votes: 1 },
          { text: '200% yes', votes: 2 },
          { text: '300% yes', votes: 1 }
        ],
        respondents: [tomId],
        responses: 4,
        order: 2
      },
      {
        surveyId: apples._id,
        question: 'Do cows eat?',
        choices: [
          { text: '100% yes', votes: 22 },
          { text: '200% yes', votes: 10 },
          { text: '300% yes', votes: 42 }
        ],
        respondents: [],
        responses: 72,
        order: 1
      },
      {
        surveyId: apples._id,
        question: 'Is Michael Bay the best?',
        choices: [
          { text: '100% yes', votes: 23 },
          { text: '200% yes', votes: 1 },
          { text: '300% yes', votes: 3 }
        ],
        respondents: [],
        responses: 6,
        order: 4
      },
      {
        surveyId: pears._id,
        question: 'How many kittens?',
        choices: [
          { text: '100% yes', votes: 3 },
          { text: '200% yes', votes: 2 },
          { text: '300% yes', votes: 1 }
        ],
        respondents: [],
        responses: 6
      },
      {
        surveyId: pears._id,
        question: 'Question 10 is good?',
        choices: [
          { text: '100% yes', votes: 3 },
          { text: '200% yes', votes: 53 },
          { text: '300% yes', votes: 15 }
        ],
        respondents: [],
        responses: 71
      }
    ]

    // loop over each sample poll and insert into database
    _.each(samplePolls, function(poll) {
      Polls.insert(poll);
    });

  }

});