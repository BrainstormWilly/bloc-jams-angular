(function(){
  function AlbumCtrl($location, Fixtures, SongPlayer, SpotifyService){
    //this.albumData = Fixtures.getAlbum();
    //this.songPlayer = SongPlayer;
    this.spotify = SpotifyService;
    //this.albumData = this.
    this.spotify.getAlbum($location.path().split("/").pop());
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', ['$location', 'Fixtures', 'SongPlayer', 'SpotifyService', AlbumCtrl]);

})();
