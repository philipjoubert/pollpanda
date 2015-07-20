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

Router.route('/surveys', {
	name: 'createSurvey',
	waitOn: function() {
		return Meteor.subscribe('surveys');
	}
});

Router.route('surveys/:_id', {
	name:'surveyPage',
	waitOn: function() {
		return [Meteor.subscribe('surveys'), Meteor.subscribe('polls')];
	},
	data: function() { return Surveys.findOne(this.params._id); }
});

Router.route('/results', {
	name: 'surveyResults',
	layoutTemplate: 'adminLayout',
	waitOn: function() {
		return Meteor.subscribe('completedPolls');
	}
});

Router.route('/questions', {
	name: 'surveyQuestions',
	layoutTemplate: 'adminLayout',
	waitOn: function() {
		return Meteor.subscribe('polls');
	}
});

Router.route('/respondents', {
	name: 'surveyRespondents',
	layoutTemplate: 'adminLayout',
	waitOn: function() {
		return Meteor.subscribe('polls');
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