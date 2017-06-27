var ViewModel = function() {
  var self = this;

  // Hard coded array simply converted in to a ko observable array, this will the reference array we wall as observable un ko, not the hard coded one

  self.bruxellesLocs = ko.observableArray(myLocs);


// we initialize the observable with an empty string, those will result in a log of everything that is typed by the user in the console.
  self.userSearch = ko.observable('');

 // this array will contain all the markers data after they 've been filtered into the userfilterlocs computed observable'

  self.filteredlist = ko.observableArray([]);
  self.NotFilterList = ko.observableArray([]);

	
  self.userFilteredLocs = ko.computed(function(){
	  
     var input = self.userSearch().toLowerCase();
	 
// We use a computed observable to create the searchfilter
		if(input) { //If there is an input
			self.filteredlist([]);// We empty filteredlist
			self.NotFilterList([]);// We empty filteredlist
			self.bruxellesLocs().forEach(function(loc,i) {// We use a loop element function
			if (self.bruxellesLocs()[i].title.toLowerCase().indexOf(input) > -1) {
				self.filteredlist.push(loc);
				 
				loc.marker.setVisible(true);
			}
			else{
				self.NotFilterList.push(loc);
				loc.marker.setVisible(false);
			}
			});

			return self.filteredlist();

		}
		else {
			self.NotFilterList().forEach(function(pos,i) {// We use a loop element function
				pos.marker.setVisible(true);
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
