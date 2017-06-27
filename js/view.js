var map;
      // Create a new blank array for all the listing markers.

function initMap() {
        // Create a styles array to use with the map.
        var styles = [
          {
            featureType: 'water',
            stylers: [
              { color: '#19a0d8' }
            ]
          },{
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
              { color: '#ffffff' },
              { weight: 6 }
            ]
          },{
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
              { color: '#e85113' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -40 }
            ]
          },{
            featureType: 'transit.station',
            stylers: [
              { weight: 9 },
              { hue: '#e85113' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
              { visibility: 'off' }
            ]
          },{
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
              { lightness: 100 }
            ]
          },{
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              { lightness: -100 }
            ]
          },{
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              { visibility: 'on' },
              { color: '#f0e4d3' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -25 }
            ]
          }
        ];
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 50.831549, lng: 4.499717},
          zoom: 13,
          styles: styles,
          mapTypeControl: false
        });


        var largeInfowindow = new google.maps.InfoWindow();
        // Style the markers a bit. This will be our listing marker icon.
        var defaultIcon = makeMarkerIcon('0091ff');
        // Create a "highlighted location" marker color for when the user
        // mouses over the marker.
        var highlightedIcon = makeMarkerIcon('FFFF24');
        var clickedIcon = makeMarkerIcon('FF0000');

        for (var i = 0; i < vm.bruxellesLocs().length; i++) {
     // Get the position from the location array.
          var position = vm.bruxellesLocs()[i].location;
          var LaT = vm.bruxellesLocs()[i].location["lat"];
          var LonG = vm.bruxellesLocs()[i].location["lng"];
          var title = vm.bruxellesLocs()[i].title;
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i,
			lat_val : LaT,
			long_val : LonG
          });

          vm.bruxellesLocs()[i].marker = marker;

          // Create an onclick event to open the large infowindow at each marker.
			marker.addListener('click', function() {
				populateInfoWindow(this, largeInfowindow);
				this.setIcon(highlightedIcon);

			});
          // Two event listeners - one for mouseover, one for mouseout,
          // to change the colors back and forth.
          marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
          });
          marker.addListener('mouseout', function() {
			var myElem = document.getElementById('pano');
			if (myElem === null) 
				this.setIcon(defaultIcon);
			
          });

          }
		

      function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          // Clear the infowindow content to give the streetview time to load.
          infowindow.setContent('');
          infowindow.marker = marker;
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
			marker.setIcon(makeMarkerIcon('0091ff'));
          });
			

          var streetViewService = new google.maps.StreetViewService();
          var radius = 50;
          // In case the status is OK, which means the pano was found, compute the
          // position of the streetview image, then calculate the heading, then get a
          // panorama from that and set the options
          function getStreetView(data, status) {
            if (status == google.maps.StreetViewStatus.OK) {
              var nearStreetViewLocation = data.location.latLng;
              var heading = google.maps.geometry.spherical.computeHeading(
                nearStreetViewLocation, marker.position);
                infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div><div id="NYCarticle"></div>');
                var panoramaOptions = {
                  position: nearStreetViewLocation,
                  pov: {
                    heading: heading,
                    pitch: 30
                  }
                };
              var panorama = new google.maps.StreetViewPanorama(
                document.getElementById('pano'), panoramaOptions);
            } else {
				var geocoder = new google.maps.Geocoder;
				var latlng = {lat: parseFloat(marker.lat_val), lng: parseFloat(marker.long_val)};
				geocoder.geocode({'location': latlng}, function(results, status) {
				  if (status === 'OK') {
					if (results[1]) {
						infowindow.setContent('<div>' + marker.title + '</div>' + '<div id="pano" style="height:auto;">' + results[0].formatted_address + '</div>');
					} 
				  } else {
					window.alert('Geocoder failed due to: ' + status);
				  }
				});
				
            }
          }
          // Use streetview service to get the closest streetview image within
          // 50 meters of the markers position
          streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
                    infowindow.open(map, marker);
      }

        var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + marker.title + '&sort=newest&api-key=4160758793fe4d548e1be3245a975b68';
        $.getJSON(nytimesUrl, function(data){
			var $nytHeaderElem = $('#nytimes-header');
			var $nytElem = $('#nytimes-articles'); 
			var $NYCarticle = $('#NYCarticle'); 
			$nytElem.text("");

			$nytHeaderElem.text('New York Times Articles About ' + marker.title);

			articles = data.response.docs;
			var article_content="";
			for (var i = 0; i < articles.length; i++) {
				if(i==0)
						article_content += "<div>NY Time articles</div>";
				var article = articles[i];
				if(article.snippet ){
					article_content +='<div id="article"><li id="article"><a href="'+article.web_url+'">'+article.headline.main+'</a><p>'+ article.snippet + '</p></li></div>';
					//infowindow.setContent('<div>' + "NY Time articles" + '</div><div id="article"><li id="article"><a href="'+article.web_url+'">'+article.headline.main+'</a><p>'+ article.snippet + '</p></li></div>');
					if(i==4)
						break;
				}	
			}
			if(article_content =="")
				article_content = "New York Times Articles <br>No article found for " + marker.title + "";
		$NYCarticle.html(article_content);
        });
          // Open the infowindow on the correct marker.
		/*
		.error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
        })
		*/

    }
      // This function takes in a COLOR, and then creates a new marker
      // icon of that color. The icon will be 21 px wide by 34 high, have an origin
      // of 0, 0 and be anchored at 10, 34).
      function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }
 }

		
