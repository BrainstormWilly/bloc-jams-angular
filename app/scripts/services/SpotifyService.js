(function() {
   function SpotifyService(Spotify) {
        var SpotifyService = {};

        var song = {
          init : function(data){
            this.title = data.name;
            this.duration = Math.floor(data.duration_ms/1000);
            this.spotify_uri = "https://embed.spotify.com/?uri=" + data.uri;
            return this;
          }
        };

        var album = {
          init : function(data){
            this.albumArtUrl = data.images[1].url;
            this.title = data.name;
            this.artist = data.artists[0].name;
            this.songs = [];
            angular.forEach(data.tracks.items, function(value, key){
              this.songs.push( Object.create(song).init(value) );
            }, this);
            // this.songs = data.tracks.items;
            this.songs_length = data.tracks.total;
            this.spotify_uri = data.uri;
            this.year = data.release_date;
            this.label = data.label;
            return this;
          }
        };

        var parseAlbums = function(value, key){
          SpotifyService.albums.push( Object.create(album).init(value.album) );
        };

        var onLogin = function(data){
          Spotify.setAuthToken(localStorage['spotify-token']);
          Spotify.getSavedUserAlbums().then(onGetSavedUserAlbums);
        };

        var onGetSavedUserAlbums = function(data){
          SpotifyService.albums = [];
          angular.forEach(data.items, parseAlbums);
        };

        var onGetAlbum = function(data){
          SpotifyService.current_album = Object.create(album).init(data);
          SpotifyService.current_song = SpotifyService.current_album.songs[0];
        };

        SpotifyService.albums = [];
        SpotifyService.current_album = null;
        SpotifyService.current_song = null;

        SpotifyService.init = function(){
          Spotify.login().then(onLogin);
        };

        SpotifyService.getAlbum = function(album_uri){
          Spotify.getAlbum(album_uri).then(onGetAlbum);
        };

        SpotifyService.play = function(song){
          SpotifyService.current_song = song;
        }


        return SpotifyService;
   }

   angular
       .module('blocJams')
       .factory('SpotifyService', ['Spotify', SpotifyService]);
})();
