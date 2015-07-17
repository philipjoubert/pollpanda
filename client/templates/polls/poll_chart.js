Template.pollChart.helpers({
  polls: function() {
    return Polls.find();
  }
});

UI.registerHelper('indexedArray', function(context, options) {
  if (context) {
    return context.map(function(item, index) {
      item._index = index + 1;
      return item;
    });
  }
});

Template.pollChart.onRendered(function() {
  //console.log("hello");
  polls = Polls.find().fetch();
  console.log(polls.length);
  numPolls = polls.length;
  // console.log(polls[0]);
  // console.log(polls[0].choices[0].votes);
  for(i=0; i < numPolls; i++) {
    console.log("check");
    data2 = [
      {
          value: (polls[i].choices[0].votes),
          color:"#F7464A",
          highlight: "#FF5A5E",
          label: "Red"
      },
      {
          value: (polls[i].choices[1].votes),
          color: "#46BFBD",
          highlight: "#5AD3D1",
          label: "Green"
      },
      {
          value: (polls[i].choices[2].votes),
          color: "#FDB45C",
          highlight: "#FFC870",
          label: "Yellow"
      }
    ];
    var ctx = document.getElementById("myChart-"+i).getContext("2d");
    var myDoughnutChart = new Chart(ctx).Doughnut(data2);
    console.log(polls[i]);
  };

  
});