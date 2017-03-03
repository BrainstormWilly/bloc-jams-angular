(function() {
   function SongPlayer(Fixtures) {
        var SongPlayer = {};

        /**
        * @desc selected album data
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();

        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;

        /**
        * @function getSongIndex
        * @desc returns index of song param in currentAlbum
        * @param {Object} song
        * @return {Number}
        */
        var getSongIndex = function(song){
          console.log(song);
          return currentAlbum.songs.indexOf(song);
        };

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song){
          if( currentBuzzObject ){
            currentBuzzObject.stop();
            song.playing = false;
          }
          currentBuzzObject = new buzz.sound(song.audioUrl, {
             formats: ['mp3'],
             preload: true
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
        * @desc current song data
        * @type {Object}
        */
        SongPlayer.currentSong = null

        /**
        * @function SongPlayer.play
        * @desc plays song or currentSong and sets to currentSong
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
          song = song || SongPlayer.currentSong;
          if( SongPlayer.currentSong !== song ){
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
        * @desc decrements song index
        */
        SongPlayer.previous = function(){
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;
          if (currentSongIndex < 0) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
          }else{
            var song = currentAlbum.songs[currentSongIndex];
            console.log(song);
            setSong(song);
            playSong(song);
          }
        };

        return SongPlayer;
   }

   angular
       .module('blocJams')
       .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
