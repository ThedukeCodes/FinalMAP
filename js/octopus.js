var ViewModel = function() {
	var self = this;

	// Hard coded array simply converted in to a ko observable array, this will the reference array we wall as observable un ko, not the hard coded one

	self.bruxellesLocs = ko.observableArray(myLocs);


	// we initialize the observable with an empty string, those will result in a log of everything that is typed by the user in the console.
	self.userSearch = ko.observable('');

	// this array will contain all the markers data after they 've been filtered into the userfilterlocs computed observable'

	self.filteredlist = ko.observableArray([]);

	// this array will contain all the markers data after they 've been rejected from the filter into the userfilterlocs computed observable'
	self.NotFilterList = ko.observableArray([]);

	// This method create a Google Map event function (see Google API)
	self.clickMarker = function(location) {
		google.maps.event.trigger(location.marker, 'click');
	}

	self.userFilteredLocs = ko.computed(function() {
		var input = self.userSearch().toLowerCase();

		// We use a computed observable to create the searchfilter
		if (input) { //If there is an input
			self.filteredlist([]); // We empty filteredlist
			self.NotFilterList([]); // We empty nofilteredlist
			self.bruxellesLocs().forEach(function(loc, i) { // We use a loop element function
				if (self.bruxellesLocs()[i].title.toLowerCase().indexOf(input) > -1) { // To check if there is an index match 
					self.filteredlist.push(loc); // If yes, we push it to the filteredlist array
					loc.marker.setVisible(true); // We use a setVisible buildin function to make them appear
				}
				else {
					self.NotFilterList.push(loc); // If no, we push it to the nofilteredlist array
					loc.marker.setVisible(false); // We use a setVisible buildin function to make them dissapear
				}
			});
			return self.filteredlist();
		}
		else { //IS there is no input
			self.NotFilterList().forEach(function(pos, i) { // We use a loop element function
				pos.marker.setVisible(true); // And use a setVisible buildin function to make them appear
			});
			return self.bruxellesLocs();
		}
	});

};
var vm = new ViewModel();
ko.applyBindings(vm);




// http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
// http://opensoul.org/2011/06/23/live-search-with-knockoutjs/