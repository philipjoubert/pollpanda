Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', {
	name: 'marketingLanding',
	layoutTemplate: 'layout',
	waitOn: function() {
		return Meteor.subscribe('unansweredPolls');
	}
});

Router.route('/unanswered-polls', {
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
	name: 'surveyDashboard',
	layoutTemplate: 'adminLayout',
	waitOn: function() {
		return [
			Meteor.subscribe('singleSurvey', this.params._id)
		];
	},
	data: function() { return Surveys.findOne(this.params._id); }
});

Router.route('surveys/:_id/questions', {
	name:'surveyQuestions',
	layoutTemplate: 'adminLayout',
	waitOn: function() {
		return [
			Meteor.subscribe('singleSurvey', this.params._id),
			Meteor.subscribe('polls', this.params._id)
		];
	},
	data: function() { return Surveys.findOne(this.params._id); }
});

Router.route('surveys/:_id/results', {
	name: 'surveyResults',
	layoutTemplate: 'adminLayout',
	waitOn: function() {
		return [
			Meteor.subscribe('singleSurvey', this.params._id),
			Meteor.subscribe('polls', this.params._id)
		];
	},
	data: function() { return Surveys.findOne(this.params._id); }
});

Router.route('surveys/:_id/respondents', {
	name: 'surveyRespondents',
	layoutTemplate: 'adminLayout',
	waitOn: function() {
		return [Meteor.subscribe('surveys'), Meteor.subscribe('polls')];
	},
	data: function() { return Surveys.findOne(this.params._id); }
});


var requireLogin = function() {
	if (! Meteor.user()) {
		this.render('accessDenied');
	} else {
		this.next();
	}
};


Router.onBeforeAction(requireLogin, {only: 'pollSubmit'});