$("#next-btn").click(function(){
    d3.select("div.slide.active + div.slide").attr('class','slide active');
    d3.select("div.slide.active").classed("active",false);
});
$("#back-btn").click(function(){
    d3.select("div.slide ~ div.slide.active").attr('class','slide active');
    d3.select("div.slide.active").classed("active",false);
});