// @TODO: YOUR CODE HERE!
// Starting with code from Class Activities 
// 16-D3/2/Activities/10-Stu_LineChart/Solved




// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Configure a parseTime function which will return a new Date object from a string
var parseTime = d3.timeParse("%B");

// Load data from miles-walked-this-month.csv
d3.csv("/data/data.csv").then(function(csvdata) {

    csvdata.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;

    });

    var xLinearScale = d3.scaleLinear()
        domain([7, d3.max(csvData, d => d.poverty)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(csvData, d => d.healthcare)])
        .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);

    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
    .data(csvdata)
    .enter()
    .append("circle")
    .attr("cx",d => xLinearScale(d.poverty))
    .attr("cy",d => yLinearScale(d.healthcare))    
    .attr("r", "10")
    .attr("fill", "green")


});








//   // Configure a drawLine function which will use our scales to plot the line's points
//   var drawLine = d3
//     .line()
//     .x(data => xTimeScale(data.date))
//     .y(data => yLinearScale(data.miles));

//   // Append an SVG path and plot its points using the line function
//   chartGroup.append("path")
//     // The drawLine function returns the instructions for creating the line for milesData
//     .attr("d", drawLine(milesData))
//     .classed("line", true);

//   // Append an SVG group element to the SVG area, create the left axis inside of it
//   chartGroup.append("g")
//     .classed("axis", true)
//     .call(leftAxis);

//   // Append an SVG group element to the SVG area, create the bottom axis inside of it
//   // Translate the bottom axis to the bottom of the page
//   chartGroup.append("g")
//     .classed("axis", true)
//     .attr("transform", "translate(0, " + chartHeight + ")")
//     .call(bottomAxis);
// });


