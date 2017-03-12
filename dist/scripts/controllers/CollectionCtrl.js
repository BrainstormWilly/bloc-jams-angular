(function(){


  function CollectionCtrl(Fixtures, SpotifyService){
    // this.albums = Fixtures.getCollection(12);
    // Spotify.getAlbum('6rnzvZhe3PA57xKcKLRtJ6').then(onGetAlbum);
    this.spotify = SpotifyService;
    this.spotify.init();
  }

  angular
    .module('blocJams')
    .controller('CollectionCtrl', ['Fixtures', 'SpotifyService', CollectionCtrl]);
})();
