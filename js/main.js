 function AppViewModel() {
    var self = this;
    
    self.sections = ["Home","Discover","Artist"];
    self.chosenSection = ko.observable();
    
    self.fixedArtists = [];
    self.artists = ko.observableArray([]);
    self.firstArtists = ko.observableArray([]);
    self.chosenArtist = ko.observable();

    // self.homeData = ko.observable(function(){
    //   return self.chosenSection == "Home";
    // },this);
    // self.discoverData = ko.observable(function(){
    //   return self.chosenSection == "Discover";
    // },this);
    // self.artistData = ko.observable(function(){
    //   return self.chosenSection == "Artist";
    // },this);


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
            artist.id = 'artist-'+(1822 + i);
            self.fixedArtists.push(artist);
            
            if(i<4) self.firstArtists.push(artist);
          });

          self.artists(self.fixedArtists);
          
          //self.firstArtists.slice(0,3);
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

      if(elm.parent().children().length === self.fixedArtists.length){
        elm.parent().masonry({            
              itemSelector : '.featured-item'
          });
      }
    }

    self.goToSection = function(section){
      location.hash = section;
    }

    self.goToArtist = function(artist){
      //self.chosenArtist(artist);
      //self.artists(null);
      
      location.hash = artist.id;
      //self.currentArtistData()
    }



    // Client-side routes    
    Sammy(function() {

        this.get('#:artist', function() {
            self.chosenArtist(this.params.artist);
            self.artists(null);
        });

        this.get('#discoverGo',function(){
          window.location.href = "discover.html";
        })

        this.get('', function() {
            self.chosenArtist(null);
            self.artists(self.fixedArtists);
        });

        // this.get('#:folder/:mailId', function() {
        //     self.chosenFolderId(this.params.folder);
        //     self.chosenFolderData(null);
        //     $.get("/mail", { mailId: this.params.mailId }, self.chosenMailData);
        // });
    
        //this.get('', function() { this.app.runRoute('get', '#Inbox') });
    }).run(); 

}
 
ko.applyBindings(new AppViewModel());

