// The data - name, coordinates, z-index, price, cuisine
//to-do: add yelp link, api?

var list = [
	['<b> Delicatessen </b> <br> 54 Prince Street', 40.723524, -73.996370, 1],
	['<b> Pepe Rosso </b> <br> 149 Sullivan Street <br> Great for takeout', 40.727190, -74.001623,1],
	['<b> Jane </b> <br> Highlights: Gazpacho', 40.727306, -74.000281,2],
];


// Enter SoHo Lunch Hour
function sohoLunchour() {
	$("#lunchour").show( "slide", {direction:'left'}, 1000);
	$("#soho").show("slide", {direction:'up'}, 1000);
}
function highlightH() {
	$("#colorH").animate({ backgroundColor: '#E19191'},1000);
}


// Show map
function initialize () {
	var centerPoint = {
          center: new google.maps.LatLng(40.725294, -73.996227),
          zoom: 16
        };
	var map = new google.maps.Map(document.getElementById("mapCanvas"),
            centerPoint);
	var markerImage = "Azure.png";
	var infoPopup = new google.maps.InfoWindow(), marker, i;
// Set markers
	for (var i = 0; i < list.length; i++) {
		var marker = new google.maps.Marker ({
			position: new google.maps.LatLng(list[i][1], list[i][2]),
			map: map,
			icon: markerImage,
			animation: google.maps.Animation.DROP,
			zIndex: list[i][3]
		});
// Click for info windows
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {
				infoPopup.setContent(list[i][0]);
				infoPopup.open(map, marker);
				}
			}) (marker, i));
	}	
	
}		

//Filter
function filter() {

$("#priceFilters :checkbox").click(function() {
	if( $(this).is(' :checked')) {
		$("." + $(this).val()).show();
	} else {
		$("." + $(this).val()).hide();
	}
});
 
/*
$("#filters :checkbox").click(function() {
       $("#filters :checkbox:checked").each(function() {
           $("." + $(this).val()).show();
       });
    });
*/
}

$(document).ready(function() {
	$("#lunchour").hide();
	$("#soho").hide();
	sohoLunchour()
	setTimeout(highlightH,1000);
	setTimeout(initialize, 1000);
	filter();

});




