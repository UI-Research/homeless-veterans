var slide = 0;
var numSlides;
var initialload = true;

$( document ).ready(function() {


L.mapbox.accessToken = 'pk.eyJ1IjoidXJiYW5pbnN0aXR1dGUiLCJhIjoiTEJUbmNDcyJ9.mbuZTy4hI_PWXw3C3UFbDQ';
var map = L.mapbox.map('map', 'urbaninstitute.nok9p4i6');


	$("div.slide").each(function(i){
		$(this).attr("id", "slide_" + i);
		numSlides = i;
	})
	$("div.slide").each(function(index){
	})
    
	if (QueryString.slide){
		gotoslide(QueryString.slide);
        initialload=false;
	}else{
		gotoslide(0);
	}
});

function gotoslide(index){
	console.log("index is " + index);
	if (index == 0){
		$(".next-back").addClass("btn-hidden");
		if (initialload){
			initialload = false;
			return;
		}
	}
	else{
		$(".next-back").removeClass("btn-hidden");
	}


	$( "div.slide.active" ).addClass("transition");

	var currentSlide = parseInt($( "div.slide.active" ).attr('id').split("_")[1]);

	// console.log(currentSlide);

	$('#slide_'+index).addClass("active");
	$( "div.slide.active.transition" ).removeClass("active");
	$( "div.slide.transition" ).removeClass("transition");
	if (index == numSlides){
		$("#next-btn").addClass("btn-hidden");
	}else{
		$("#next-btn").removeClass("btn-hidden");
	}

// update URL
var newURL = updateURLParameter(window.location.href, 'slide', index);
newURL = updateURLParameter(newURL, 'slide', index);

var stateObj = { foo: "Veterans" };
history.pushState(stateObj, "Urban Institute Veterans Feature", newURL);
}


$("#next-btn").click(function(){
	//get current slide ID
	var currentID = parseInt($( "div.slide.active" ).attr('id').split("_")[1]);
	console.log(currentID);
	//go to slide with current ++
	gotoslide(currentID+1);	
});

$("#back-btn").click(function(){
	//get current slide ID
	var currentID = parseInt($( "div.slide.active" ).attr('id').split("_")[1]);
	console.log(currentID);
	//go to slide with current --
	gotoslide(currentID-1);
});



$(".about").click(function(){
	$("div.about-slide").addClass("about-active");
});



$("#return-feature").click(function(){
	$("div.about-slide").removeClass("about-active");
});


$("#start-btn").click(function (){
	gotoslide(1);
});


var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
  	var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
        	query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
    	var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
    	query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
    	query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
} 
return query_string;
}();



function updateURLParameter(url, param, paramVal)
{
    var TheAnchor = null;
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";

    if (additionalURL) 
    {
        var tmpAnchor = additionalURL.split("#");
        var TheParams = tmpAnchor[0];
            TheAnchor = tmpAnchor[1];
        if(TheAnchor)
            additionalURL = TheParams;

        tempArray = additionalURL.split("&");

        for (i=0; i<tempArray.length; i++)
        {
            if(tempArray[i].split('=')[0] != param)
            {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }        
    }
    else
    {
        var tmpAnchor = baseURL.split("#");
        var TheParams = tmpAnchor[0];
            TheAnchor  = tmpAnchor[1];

        if(TheParams)
            baseURL = TheParams;
    }

    if(TheAnchor)
        paramVal += "#" + TheAnchor;

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}
