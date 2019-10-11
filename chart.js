// Our labels along the x-axis
var years = [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2040];
// For drawing the lines
var stock2 = [86, 114, 10, 100, 110, 182, 10, 221, 783, 2478];
var stock3 = [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267];
var stock4 = [168, 170, 178, 190, 203, 276, 408, 547, 675, 734];

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: years,
    datasets: [
      {
        data: stock2
      }
    ]
  }
});
