Meteor.publish('surveys', function() {
	return Surveys.find();
});

Meteor.publish('singleSurvey', function(surveyId) {
	check(surveyId, String);
	return Surveys.find(surveyId);
});

Meteor.publish('polls', function(surveyId) {
	return Polls.find({surveyId: surveyId});
});

Meteor.publish('unansweredPolls', function() {
	return Polls.find({respondents: {$ne: this.userId}});
});

Meteor.publish('completedPolls', function() {
	return Polls.find({respondents: {$eq: this.userId}});
});

