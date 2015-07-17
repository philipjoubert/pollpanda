Template.poll.events({
	'click .vote': function(event) {
		event.preventDefault();

		//get the parent poll id
		var pollId = $(event.currentTarget).parent('.poll').data('id');
		var voteId = $(event.currentTarget).data('id');

		// create the incrementing object so we can add to the corresponding vote
		var voteString = 'choices.' + voteId + '.votes';
		var action = {};
		action[voteString] = 1;

		Meteor.call('vote', pollId, voteId);
		// Polls.update(
		// 	{_id: pollId},
		// 	{$inc: action}
		// );

	}
});