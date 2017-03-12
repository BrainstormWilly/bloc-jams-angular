(function() {
     function trustAsResourceUrl($sce) {
         return function(uri) {
           return $sce.trustAsResourceUrl(uri);
         };
     }

     angular
         .module('blocJams')
         .filter('trustAsResourceUrl', ['$sce', trustAsResourceUrl]);
 })();
