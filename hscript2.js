// The data for map - name, coordinates


var list = [
	['<div class="rMap">' + '<a target="_blank" href="http://delicatessennyc.com"><div class="links"><b>Delicatessen</b></div></a>' + '54 Prince Street ' + '<br><a target="_blank" href="http://www.yelp.com/biz/delicatessen-new-york"><div class="links">Yelp</div></a>' + '</div>', 40.723472, -73.996333, 1],
	['<div class="rMap">' + '<a target="_blank" href="http://www.peperossotogo.com/"><div class="links"><b>Pepe Rosso</b></div></a>' + '149 Sullivan Street' + '<br><a target="_blank" href="http://www.yelp.com/biz/pepe-rosso-to-go-new-york"><div class="links">Yelp</div></a>' + '</div>', 40.727190, -74.001623,1],
	['<div class="rMap">' + '<a target="_blank" href="http://janerestaurant.com/"><div class="links"><b>Jane</b></div></a>' + '100 W Houston Street' + '<br><a target="_blank" href="http://www.yelp.com/biz/jane-new-york-2"><div class="links">Yelp</div></a>' + '</div>', 40.727306, -74.000281,2],
 ['<div class="rMap">' +  '<a target="_blank" href="http://saxonandparole.com/"><div class="links"><b>Saxon + Parole</b></div></a>' + '316 Bowery ' + '<br><a target="_blank" href="http://www.yelp.com/biz/saxon-parole-new-york"><div class="links">Yelp</div></a>' + '</div>', 40.725172, -73.992574],
 ['<div class="rMap">' +  '<a target="_blank" href="http://www.fivepointsrestaurant.com"><div class="links"><b>Five Points</b></div></a>' + '31 Great Jones St. ' + '<br><a target="_blank" href="http://www.yelp.com/biz/five-points-new-york"><div class="links">Yelp</div></a>' + '</div>', 40.726815, -73.993191],
 ['<div class="rMap">' +  '<a target="_blank" href="http://www.ilbuco.com/"><div class="links"><b>Il Buco</b></div></a>' + '47 Bond Street ' + '<br><a target="_blank" href="http://www.yelp.com/biz/il-buco-new-york"><div class="links">Yelp</div></a>' + '</div>', 40.725844, -73.992966],
 ['<div class="rMap">' +  '<a target="_blank" href="http://barprimi.com/"><div class="links"><b>Bar Primi</b></div></a>' + '325 Bowery ' + '<br><a target="_blank" href="http://www.yelp.com/biz/bar-primi-new-york-3"><div class="links">Yelp</div></a>' + '</div>', 40.725675, -73.991813],
 ['<div class="rMap">' +  '<a target="_blank" href="http://www.davidburkekitchennyc.com/"><div class="links"><b>David Burke Kitchen</b></div></a>' + '23 Grand Street ' + '<br><a target="_blank" href="http://www.yelp.com/biz/david-burke-kitchen-new-york"><div class="links">Yelp</div></a>' + '</div>', 40.722785, -74.004925],

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




