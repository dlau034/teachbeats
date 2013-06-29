 function AppViewModel() {
    var self = this;
 
    self.artists = ko.observableArray([]);
    // self.artists.subscribe(function(element){
    //      $('#box').masonry({            
    //         itemSelector : '.featured-item'
    //       });
    // });


    self.getArtists = function(){
  
        $.getJSON('js/objects.json',function(data){
          //console.log(data);
          $.each(data.artists,function(i,artist){
            self.artists.push(artist);
          });
          //     $('ul').append('<li>'+emp.firstName+' '+emp.lastName+'</li>');
          // });
          }).error(function(){
              console.log('error');
          });
    }

    self.getArtists();

    self.useMasonry = function(element){


      //if ($('#box').children().length === ko.toJS(this.myItems).length) {
        // Only now execute handler
        //console.log("SAD");
      //}
    }
    // self.addPerson = function() {
    //     self.people.push({ name: "New at " + new Date() });
    // };
 
    // self.removePerson = function() {
    //     self.people.remove(this);
    // }
}
 
ko.applyBindings(new AppViewModel());

