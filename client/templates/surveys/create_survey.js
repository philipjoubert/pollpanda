Template.createSurvey.helpers({
	surveys: function() {
    return Surveys.find();
  }
});

Template.createSurvey.events({

  // handle the form submission
  'submit form': function(event) {

    // stop the form from submitting
    event.preventDefault();

    // get the data we need from the form
    var newSurvey = {
      title: event.target.title.value
    };
     
    // create the new poll
    Meteor.call('surveyInsert', newSurvey, function(errors, result) {
    	Router.go('surveyPage', {_id: result._id});
    }); 
  }
});