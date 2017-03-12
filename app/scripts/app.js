
(function(){
  function config($stateProvider, $locationProvider, SpotifyProvider){
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });
    $stateProvider
      .state('landing',{
        url: '/',
        controller: 'LandingCtrl as landing',
        templateUrl: '/templates/landing.html'
      })
      .state('album', {
           url: '/album/:albumId',
           controller: "AlbumCtrl as album",
           templateUrl: '/templates/album.html'
      })
      .state('collection', {
          url: '/collection',
          controller: "CollectionCtrl as collection",
          templateUrl: '/templates/collection.html'
      })
      .state('spotify-callback', {
        url: '/spotify-callback',
        templateUrl: '/templates/spotify-callback.html'
      });
      SpotifyProvider.setClientId('3784595f7bbc474abfdc3178b94bf3fc');
      SpotifyProvider.setRedirectUri('http://enigmatic-caverns-73577.herokuapp.com/spotify-callback');
      SpotifyProvider.setScope('user-library-read');
      if( localStorage['spotify-token'] ){
        SpotifyProvider.setAuthToken(localStorage['spotify-token']);
      }

  }
  angular
    .module('blocJams', ['ui.router', 'spotify'])
    .config(config);

})();
