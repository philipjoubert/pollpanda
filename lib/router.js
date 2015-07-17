Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', {
	name: 'pollsList',
	waitOn: function() {
		return Meteor.subscribe('unansweredPolls');
	}
});

Router.route('/submit', {
	name: 'pollSubmit'
});

Router.route('/completed', {
	name: 'completedPolls',
	waitOn: function() {
		return Meteor.subscribe('completedPolls');
	}
});

Router.route('/charts', {
	name: 'pollChart',
	waitOn: function() {
		return Meteor.subscribe('completedPolls');
	}
});


var requireLogin = function() {
	if (! Meteor.user()) {
		this.render('accessDenied');
	} else {
		this.next();
	}
};


Router.onBeforeAction(requireLogin, {only: 'pollSubmit'});