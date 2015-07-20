Template.test.events({
  'click .btn' : function(e) {
    var clickedButton = e.currentTarget;
    alert( $(clickedButton).val() );
  }
});