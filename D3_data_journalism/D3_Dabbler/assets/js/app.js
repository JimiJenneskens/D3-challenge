// @TODO: YOUR CODE HERE!

// Create containter diminsions
var svgWidth = 960;
var svgHeight = 540;

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
    });
  
    // create scales
    var xScale = d3.scaleLinear()
      .domain(d3.extent(healthData, d => d.age))
      .range([0, width])
      .nice(); 
  
    var yScale = d3.scaleLinear()
      .domain([6,d3.max(healthData, d => d.smokes)])
      .range([height, 0])
      .nice();
    
    // create Axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
  
  
  // append axes
    chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
    chartGroup.append("g").call(yAxis);
  
  // generate scatter plot
  chartGroup.selectAll("circle")
  .data(healthData)
  .enter()
  .append("circle")
  .attr("cx", d=>xScale(d.age))
  .attr("cy", d=>yScale(d.smokes))
  .attr("r", 15)
  .classed("stateCircle", true);
  
  // add text to each datapoint
  chartGroup.append("g")
    .selectAll('text')
    .data(healthData)
    .enter()
    .append("text")
    .text(d=>d.abbr)
    .attr("x",d=>xScale(d.age))
    .attr("y",d=>yScale(d.smokes))
    .classed(".stateText", true)
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .attr("font-size", "10px")
    .style("font-weight", "bold")
    .attr("alignment-baseline", "central");
    
    // add axes titles
    chartGroup.append("text")
          .attr("transform", `translate(${width / 2}, ${height + margin.top + 13})`)
          .attr("text-anchor", "middle")
          .attr("font-size", "16px")
          .attr("fill", "black")
          .style("font-weight", "bold")
          .text("Median Age");
  
          chartGroup.append("text")
          .attr("y", 0 - ((margin.left / 2) + 2))
          .attr("x", 0 - (height / 2))
          .attr("text-anchor", "middle")
          .attr("font-size", "16px")
          .attr("fill", "black")
          .style("font-weight", "bold")
          .attr("transform", "rotate(-90)")
          .text("Smokers (%)");
  }).catch(function(err) {
    console.log(err);
  });