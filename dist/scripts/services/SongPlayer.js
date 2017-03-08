(function() {
   function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};

        /**
        * @desc selected album data
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();

        /**
        * @desc time (seconds) of current song
        * @type {Number}
        */
        var currentTime = null;

        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = new buzz.sound(currentAlbum.songs[0].audioUrl, {
           formats: ['mp3'],
           preload: true
        });

        /**
        * @function getSongIndex
        * @desc returns index of song param in currentAlbum
        * @param {Object} song
        * @return {Number}
        */
        var getSongIndex = function(song){
          return currentAlbum.songs.indexOf(song);
        };

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song){
          if( currentBuzzObject ){
            stopSong(song);
          }
          currentBuzzObject = new buzz.sound(song.audioUrl, {
             formats: ['mp3'],
             preload: true
          });
          currentBuzzObject.bind('timeupdate', function() {
            $rootScope.$apply(function() {
              currentTime = currentBuzzObject.getTime();
              // SongPlayer.currentTime = currentBuzzObject.getTime();
            });
          });
          SongPlayer.currentSong = song;
        };

        /**
         * @function playSong
         * @desc Plays passed song and sets its playing param to true
         * @param {Object} song
         */
        var playSong = function(song){
          currentBuzzObject.play();
          song.playing = true;
        };

        /**
         * @function stopSong
         * @desc Stops passed song and sets its playing param to null
         * @param {Object} song
         */
        var stopSong = function(song){
          currentBuzzObject.stop();
          song.playing = null;
        };

        /**
        * @desc current song data
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /**
        * @function SongPlayer.getCurrentTime
        * @desc current position in time in currentSong timecoded
        * @return {String}
        */
        SongPlayer.getCurrentTime = function(){
          if( ~currentTime ) return  buzz.toTimer(currentTime);
          return "-:--";
        }

        /**
        * @function SongPlayer.getDuration
        * @desc returns duration of param or currentSong timecoded
        * @param {Number}
        * @return {String}
        */
        SongPlayer.getDuration = function(duration){
          if( duration ) return buzz.toTimer(duration);
          if( SongPlayer.currentSong ) return buzz.toTimer(SongPlayer.currentSong.duration);
          return "-:--";
        }

        /**
        * @desc song volume level (0-100)
        * @type {Number}
        */
        SongPlayer.volume = 100;

        /**
        * @function SongPlayer.play
        * @desc plays song or currentSong and sets to currentSong
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
          song = song || SongPlayer.currentSong;
          if( SongPlayer.currentSong !== song ){
            stopSong(SongPlayer.currentSong);
            setSong(song);
            playSong(song);
          }else if( SongPlayer.currentSong === song ){
            if( currentBuzzObject.isPaused() ){
              playSong(song);
            }
          }
        };

        /**
        * @function SongPlayer.play
        * @desc pauses song or currentSong and turns on song.playing state
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
          song = song || SongPlayer.currentSong;
          currentBuzzObject.pause();
          song.playing = false;
        };

        /**
        * @function SongPlayer.previous
        * @desc decrements song index and plays it
        */
        SongPlayer.previous = function(){
          var song, currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;
          stopSong(SongPlayer.currentSong);
          if ( ~currentSongIndex ) {
            song = currentAlbum.songs[currentSongIndex];
          }else{
            song = currentAlbum.songs[currentAlbum.songs.length-1];
          }
          setSong(song);
          playSong(song);
        };

        /**
        * @function SongPlayer.next
        * @desc increments song index and plays it
        */
        SongPlayer.next = function(){
          var song, currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;
          stopSong(SongPlayer.currentSong);
          if (currentSongIndex < currentAlbum.songs.length) {
            song = currentAlbum.songs[currentSongIndex];
          }else{
            song = currentAlbum.songs[0];
          }
          setSong(song);
          playSong(song);
        };

        /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
         SongPlayer.setCurrentTime = function(time) {
             if (currentBuzzObject) {
                 currentBuzzObject.setTime(time);
             }
         };

         /**
          * @function setVolume
          * @desc Set current volume (0-100) of player
          * @param {Number} volume
          */
          SongPlayer.setVolume = function(volume) {
              if (currentBuzzObject) {
                  currentBuzzObject.setVolume(volume);
              }
          };

        setSong(currentAlbum.songs[0]);


        return SongPlayer;
   }

   angular
       .module('blocJams')
       .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
