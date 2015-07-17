Template.pollSubmit.onCreated(function() {
  Session.set('pollSubmitErrors', {});
});

Template.pollSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('pollSubmitErrors')[field];
  },
  errorClass:function(field) {
    return !!Session.get('pollSubmitErrors')[field] ?'has-error' : '';
  }
});

Template.pollSubmit.events({

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
      respondents: [],
      responses: 0
    };

    var errors = validatePoll(newPoll);

    if (errors.question || errors.choice1 || errors.choice2 || errors.choice3) {
      return Session.set('pollSubmitErrors', errors);
    };
     
    // create the new poll
    Polls.insert(newPoll);

    Router.go('pollsList');
  }
});