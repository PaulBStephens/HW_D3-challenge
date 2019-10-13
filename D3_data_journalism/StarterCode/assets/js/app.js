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
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Load data from miles-walked-this-month.csv
d3.csv("assets/data/data.csv").then(function(csvdata) {

    csvdata.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;

    });

    var xLinearScale = d3.scaleLinear()
        .domain([7, d3.max(csvdata, d => d.poverty)])
        .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(csvdata, d => d.healthcare)])
        .range([chartHeight, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);

    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
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

// });






    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.abbr}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 10)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "5px")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top - 5})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
    //add abbr inside circle
    
    chartGroup.selectAll().data(csvdata).enter().append("text").text(function(d){
      return d.abbr;
    })
    .attr("x",d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("text-anchor", "middle")
    .attr('fill', 'white')
    .attr('font-size', 10);

    
});

