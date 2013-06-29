//  Array.prototype.get = function(name) {
//     for (var i=0, len=this.length; i<len; i++) {
//         if (typeof this[i] != "object") continue;
//         if (this[i].name === name) return this[i].value;
//     }
// };

 function AppViewModel() {
    var self = this;
    
    self.sections = ["home","discover","detail"];
    self.chosenSection = ko.observable();
    
    self.fixedArtists = [];
    self.artists = ko.observableArray([]);
    self.firstArtists = ko.observableArray([]);
    self.chosenArtist = ko.observable();

    // self.imgs = ["asd","asdasda"];
    //self.imgs = ko.observable();

    self.homeData = ko.computed(function(){
      return self.chosenSection() === "home";
    },this);
    self.detailData = ko.computed(function(){
      return self.chosenSection() === "detail";
    },this);

    self.discoverData = ko.computed(function(){
      return self.chosenSection() === "discover";
    },this);




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
            artist.id = 1822 + i;
            self.fixedArtists.push(artist);
            
            if(i<4) self.firstArtists.push(artist);
          });

          self.artists(self.fixedArtists);
          console.log(self.artists());
          
          //self.firstArtists.slice(0,3);
            //console.log(self.fixedArtists);
            
          //     $('ul').append('<li>'+emp.firstName+' '+emp.lastName+'</li>');
          // });
          }).error(function(){
              console.log('error');
          });
    }

    self.getArtists();


    self.getArtist = function(id){
      //console.log(self.artists());
      for(var i = 0; i < self.artists().length; i++){
        //console.log(self.artists()[i].id,id);
        if(self.artists()[i].id == id) return self.artists()[i];
      }
    }


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
      location.hash = 'detail' + "/" + artist.id;
    }

    self.loadDisqus = function(){

      /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
        var disqus_shortname = 'teachbeats'; // required: replace example with your forum shortname
        /* * * DON'T EDIT BELOW THIS LINE * * */
        (function() {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();

    }

    // Client-side routes    
    Sammy(function() {

        this.get('#:section', function() {
            self.chosenSection(this.params.section);
        });


        this.get('#:section/:id',function(){
          self.chosenSection(this.params.section);
          
          //console.log();

          if(!self.artists().length){
            self.getArtists();
            that = this;

            var timer = window.setTimeout(function(){
              self.chosenArtist(self.getArtist(that.params.id));
              console.log("ASD");
            },500)
          } else {

            self.chosenArtist(self.getArtist(this.params.id));

          }

          //console.log(self.chosenArtist());
          // console.log(self.getArtist(1822));
          // 
          self.loadDisqus();
        })

 
        this.get('', function() {
            self.chosenSection('home');

            console.log(self.chosenSection());
            //console.log("home");

            //self.chosenArtist(null);
            //self.artists(self.fixedArtists);
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

