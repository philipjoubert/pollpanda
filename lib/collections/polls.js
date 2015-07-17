Polls = new Mongo.Collection('polls');

validatePoll = function(poll) {
	var errors = {};

	if(!poll.question) {
		errors.question = "Please fill in a question";
	};

	if(!poll.choices[0].text){
		errors.choice1 = "Please fill in each option";	
	};
	if(!poll.choices[1].text){
		errors.choice2 = "Please fill in each option";	
	};
	if(!poll.choices[2].text){
		errors.choice3 = "Please fill in each option";	
	};
	return errors;
};

// Polls.allow({
// 	insert: function(userId, doc) {
// 		return !!userId;
// 	}
// });

Meteor.methods({
	vote: function(pollId, voteId) {
    check(pollId, String);
    var poll = Polls.findOne(pollId);
    var votesCount = (poll.choices)[voteId].votes;
    votesCount = votesCount + 1;

    if (!poll)
      throw new Meteor.Error('invalid', 'Poll not found');
    if (_.include(poll.respondents, this.userId))
      throw new Meteor.Error('invalid', 'Already answered this question');

    var setModifier = { $set: {} };
    setModifier.$set["choices." + voteId + ".votes"] = votesCount;

    Polls.update(poll._id, {
      $addToSet: {respondents: this.userId},
			$inc: {responses: 1}
    });

    Polls.update(poll._id, setModifier);
  }
});