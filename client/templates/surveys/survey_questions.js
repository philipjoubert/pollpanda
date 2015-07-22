Template.surveyQuestions.helpers({
	polls: function() {
    return Polls.find({surveyId: this._id}, {sort: {order: 1}});
  },

  pollsOptions: {
    sortField: 'order',  // defaults to 'order' anyway
    group: {
      name: 'pollsGroup',
      put: true
    },
    onSort: function (event) {
      console.log('Item %s went from #%d to #%d',
          event.data.name, event.oldIndex, event.newIndex
      );
    }
  },

  errorMessage: function(field) {
    return Session.get('pollSubmitErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('pollSubmitErrors')[field] ?'has-error' : '';
  }
});

Template.surveyQuestions.events({

  // handle the form submission
  'submit form': function(event) {

    // stop the form from submitting
    event.preventDefault();

    var polls = Polls.find().fetch();

    console.log(polls.length);
    pollLength = polls.length;

    var orderNum = polls[pollLength-1].order;

    var orderNum = 0;

    for(i = 0; i < polls.length; i++) {
    	if (this.order > orderNum) {
    		orderNum = this.order;
    		console.log(orderNum);
    	}
    }

    console.log(orderNum);

    var surveyId = this._id;

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
      responses: 0,
      order: orderNum + 1
    };

    var errors = validatePoll(newPoll);

    if (errors.question || errors.choice1 || errors.choice2 || errors.choice3) {
      return Session.set('pollSubmitErrors', errors);
    };
     
    // create the new poll
    Polls.insert(newPoll);

    Router.go('surveyPage', {_id: surveyId});
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var pollId = $(e.currentTarget).data('id');
      Polls.remove(pollId);
    }
  }
});