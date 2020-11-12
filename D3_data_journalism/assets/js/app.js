// @TODO: YOUR CODE HERE!

// Create containter diminsions
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Add SVG elements
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Group elements together
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import and format the data to numerical values
d3.csv("assets/data/data.csv").then(function(healthData) {
    healthData.forEach(function(data) {
      data.age = +data.age;
      data.smokes = +data.smokes;
      console.log(data);
    });
})