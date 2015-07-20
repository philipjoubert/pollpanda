Surveys = new Mongo.Collection('surveys');

Meteor.methods({
	surveyInsert: function(surveyAttributes) {
    check(this.userId, String);

   	check(surveyAttributes, {
   		title: String
   	});

   	var user = Meteor.user();

   	var survey = _.extend(surveyAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date()
    });

   	var surveyId = Surveys.insert(survey);

   	return {
      _id: surveyId
    };
  }
});