(function() {
     function timecode() {
         return function(seconds) {

           if( Number.isNaN(seconds) ){
             return '-:--';
           }

           var secs = "00";
           var mins = Math.floor(seconds / 60);
           if( mins>0 ){
               secs = Math.round(seconds % 60);
           }else{
               secs = Math.round(seconds);
           }
           if( secs<10 ){
               secs = "0" + secs;
           }
           return mins + ":" + secs;
         };
     }

     angular
         .module('blocJams')
         .filter('timecode', timecode);
 })();
