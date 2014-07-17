// The data for map - name, coordinates, z-index 


var list = [
	['<b> Delicatessen </b> <br> 54 Prince Street', 40.723524, -73.996370, 1],
	['<b> Pepe Rosso </b> <br> 149 Sullivan Street <br> Great for takeout', 40.727190, -74.001623,1],
	['<b><a target="_blank" href="http://janerestaurant.com/"> Jane </a></b> <br> ', 40.727306, -74.000281,2],
];


// Enter SoHo Lunch Hour
function sohoLunchour() {
	var logo = 'Soho-Lunch-Hour-logo.png';
	$("#logo").fadeIn("fast");
}
// Show map
function initialize () {
	var centerPoint = {
          center: new google.maps.LatLng(40.725294, -73.996227),
          zoom: 16
        };
	var map = new google.maps.Map(document.getElementById("mapCanvas"),
            centerPoint);
	var markerImage = "ruby-marker.png";
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

function filterAll() {
var price = [], cuisine = [], goodFor = [];
		/* Take all the checkboxes with name "byPrice" and trigger jQuery's change event when one of the checkboxes is checked. 
		   Any checked checkboxes will have their value added to the price array. Do the same for the other two categories and their corresponding arrays. */
		$("input[name=byPrice]").on( "change", function() {
			if (this.checked) price.push("[data-category~='" + $(this).attr("value") + "']");
			else removeThis(price, "[data-category~='" + $(this).attr("value") + "']");
		});
		
		$("input[name=byCuisine]").on( "change", function() {
			if (this.checked) cuisine.push("[data-category~='" + $(this).attr("value") + "']");
			else removeThis(cuisine, "[data-category~='" + $(this).attr("value") + "']");
		});
		
		$("input[name=byGoodFor]").on( "change", function() {
			if (this.checked) goodFor.push("[data-category~='" + $(this).attr("value") + "']");
			else removeThis(goodFor, "[data-category~='" + $(this).attr("value") + "']");
		});
		
		// Create a string and base all filtered results on how the string changes 
		$("input").on( "change", function() {
			var str = "Include items \n";
			var selector = '', cselector = '', gselector = '';
					
			var $lis = $('.restaurants > div'),
				$checked = $('input:checked');	
				
			if ($checked.length) {	
			
				if (price.length) {		
					if (str == "Include items \n") {
						str += "    " + "with (" +  price.join(',') + ")\n";				
						$($('input[name=byPrice]:checked')).each(function(index, price){
							if(selector === '') {
								selector += "[data-category~='" + price.id + "']";  					
							} else {
								selector += ",[data-category~='" + price.id + "']";	
							}				 
						});					
					} else {
						str += "    AND " + "with (" +  price.join(' OR ') + ")\n";				
						$($('input[name=byCuisine]:checked')).each(function(index, price){
							selector += "[data-category~='" + price.id + "']";
						});
					}							
				}
				
				if (cuisine.length) {						
					if (str == "Include items \n") {
						str += "    " + "with (" +  cuisine.join(' OR ') + ")\n";					
						$($('input[name=byCuisine]:checked')).each(function(index, cuisine){
							if(selector === '') {
								selector += "[data-category~='" + cuisine.id + "']";  					
							} else {
								selector += ",[data-category~='" + cuisine.id + "']";	
							}				 
						});					
					} else {
						str += "    AND " + "with (" +  cuisine.join(' OR ') + ")\n";				
						$($('input[name=byCuisine]:checked')).each(function(index, cuisine){
							if(cselector === '') {
								cselector += "[data-category~='" + cuisine.id + "']";  					
							} else {
								cselector += ",[data-category~='" + cuisine.id + "']";	
							}					
						});
					}			
				}
				
				if (goodFor.length) {			
					if (str == "Include items \n") {
						str += "    " + "with (" +  goodFor.join(' OR ') + ")\n";				
						$($('input[name=byGoodFor]:checked')).each(function(index, goodFor){
							if(selector === '') {
								selector += "[data-category~='" + goodFor.id + "']";  					
							} else {
								selector += ",[data-category~='" + goodFor.id + "']";	
							}				 
						});				
					} else {
						str += "    AND " + "with (" +  goodFor.join(' OR ') + ")\n";				
						$($('input[name=byGoodFor]:checked')).each(function(index, goodFor){
							if(gselector === '') {
								gselector += "[data-category~='" + goodFor.id + "']";  					
							} else {
								gselector += ",[data-category~='" + goodFor.id + "']";	
							}	
						});
					}			 
				}
			
				$lis.hide(); 
				console.log(selector);
				console.log(cselector);
				console.log(gselector);
			
				if (cselector === '' && gselector === '') {			
					$('.restaurants > div').filter(selector).fadeIn(500);
				} else if (cselector === '') {
					$('.restaurants > div').filter(selector).filter(gselector).fadeIn(500);
				} else if (gselector === '') {
					$('.restaurants > div').filter(selector).filter(cselector).fadeIn(500);
				} else {
					$('.restaurants > div').filter(selector).filter(cselector).filter(gselector).fadeIn(500);
				}
				
			} else {
				$lis.fadeIn(500);
			}	
								  
			
	
		});
		
		function removeThis(arr) {
			var what, a = arguments, L = a.length, ax;
			while (L > 1 && arr.length) {
				what = a[--L];
				while ((ax= arr.indexOf(what)) !== -1) {
					arr.splice(ax, 1);
				}
			}
			return arr;
		}

}

$(document).ready(function() {
	sohoLunchour();
	initialize();
	filterAll();

});




