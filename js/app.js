'use strict';
angular.module('app', ['ngRoute'])
.controller('mainController', function($scope, $http, $rootScope){
   $scope.seePlot = false;
   //get films
   $scope.lookUpFilm = function(search) {
      // refactor into service
      var requestURL = 'http://www.omdbapi.com/?s=' + $scope.search;
      $http({
        url: requestURL,
        method: "GET"
      })
      // callback on success
      .then(function(_datas) {
         if (_datas.data.Error == 'Movie not found!') {
           $scope.films=[];
           $scope.nofilms = true;
         }
         else {
           $scope.nofilms = false;
           $scope.films=[];
           $scope.films = _datas.data.Search;
         }           
      },
      // on error
      function() {
         console.log("call fail - " + _datas.status);      
      });  
   }
   //sorting film items
   $scope.sortOptions = ["Title", "Year"];
   $scope.sort = "Title";
   $scope.setSort = function(option) { 
      $scope.sort = option; 
   };
   //get plot on click
   $scope.moreInfo = function(film, $event, obj){
      // refactor into service
      var requestMoreURL = "http://www.omdbapi.com/?t=" + film.Title + "&tomatoes=true&plot=full";
      $http({
        url: requestMoreURL,
        method: "GET"
      })
      // callback on success
      .then(function(response){
         $scope.plot = response.data.Plot;
      },
      // on error
      function() {
         console.log("call fail - " + _datas.status);      
      });
   }
   // on film click bring movie in focus and display plot 
   $scope.focusPlot = function(){
      $(event.currentTarget).toggleClass('enlarge');
      $(event.currentTarget).find('.film-box').toggleClass('enheight');
      $scope.seePlot = ($(event.currentTarget).hasClass('enlarge') ? true : false);
      $(event.currentTarget).siblings().toggle();
   }
})

// ROUTING base
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/',   {templateUrl: 'index.html'})
  .otherwise({redirectTo: '/'});
}]);
