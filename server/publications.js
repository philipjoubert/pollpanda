Meteor.publish('polls', function() {
	return Polls.find();
});

Meteor.publish('unansweredPolls', function() {
	return Polls.find({respondents: {$ne: this.userId}});
});

Meteor.publish('completedPolls', function() {
	return Polls.find({respondents: {$eq: this.userId}});
});


Meteor.publish('surveys', function() {
	return Surveys.find();
});
