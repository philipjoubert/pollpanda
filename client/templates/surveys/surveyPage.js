Template.surveyPage.helpers({
	polls: function() {
    return Polls.find({surveyId: this._id});
  },

  errorMessage: function(field) {
    return Session.get('pollSubmitErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('pollSubmitErrors')[field] ?'has-error' : '';
  }
});

Template.surveyPage.events({

  // handle the form submission
  'submit form': function(event) {

    // stop the form from submitting
    event.preventDefault();

    // get the data we need from the form
    var newPoll = {
      question: event.target.question.value,
      choices: [
        {  text: event.target.choice1.value, votes: 0 },
        {  text: event.target.choice2.value, votes: 0 },
        {  text: event.target.choice3.value, votes: 0 }
      ],
      surveyId: this._id,
      respondents: [],
      responses: 0
    };

    var errors = validatePoll(newPoll);

    if (errors.question || errors.choice1 || errors.choice2 || errors.choice3) {
      return Session.set('pollSubmitErrors', errors);
    };
     
    // create the new poll
    Polls.insert(newPoll);

    Router.go('surveyPage');
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var pollId = $(e.currentTarget).data('id');
      Polls.remove(pollId);
    }
  }
});

