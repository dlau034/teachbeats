 function AppViewModel() {
    var self = this;
    
    self.fixedArtists = [];
    self.artists = ko.observableArray([]);
    self.chosenArtist = ko.observable();
    //self.currentArtistData = ko.observable();
    // self.artists.subscribe(function(element){
    //      $('#box').masonry({            
    //         itemSelector : '.featured-item'
    //       });
    // });


    self.getArtists = function(){
  
        $.getJSON('js/objects.json',function(data){
          //console.log(data);
          $.each(data.artists,function(i,artist){
            self.fixedArtists.push(artist);
          });

          self.artists(self.fixedArtists);
            //console.log(self.fixedArtists);
            
          //     $('ul').append('<li>'+emp.firstName+' '+emp.lastName+'</li>');
          // });
          }).error(function(){
              console.log('error');
          });
    }

    self.getArtists();

    self.useMasonry = function(elm,obj){
      elm = $(elm[1]);

      elm.parent().masonry({            
            itemSelector : '.featured-item'
        });
    }


    self.goToArtist = function(artist){
      self.chosenArtist(artist);
      self.artists(null);
      //self.currentArtistData()
    }
    // self.addPerson = function() {
    //     self.people.push({ name: "New at " + new Date() });
    // };
 
    // self.removePerson = function() {
    //     self.people.remove(this);
    // }
}
 
ko.applyBindings(new AppViewModel());

