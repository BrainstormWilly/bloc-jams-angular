(function() {
   function PlayerBarCtrl(Fixtures, SongPlayer, SpotifyService) {
      //  this.albumData = Fixtures.getAlbum();
      //  this.songPlayer = SongPlayer;
      this.spotify = SpotifyService;
   }

   angular
       .module('blocJams')
       .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', 'SpotifyService', PlayerBarCtrl]);
})();
