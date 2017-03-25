angular.module('Demo', ['ngSanitize','GoogleCalendar']);

angular.module('Demo').config([
  '$compileProvider',
  function( $compileProvider ) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|webcal):/);
  }
]);

angular.module('Demo').controller('googleCtrl', function($scope, $filter){
  rl_google_key = 'AIzaSyB0ZQbtnxFW7P_xLWACEAHYd5DKHSSncQ4'

  $scope.all_calendars = [];

  //$scope.gfinity = {
  //  google_key: rl_google_key,
  //  calendar_id: '5gmq2097f1r5i2p2b09n6t2280@group.calendar.google.com'
  //};

  //$scope.misc = {
  //  google_key: rl_google_key,
  //  calendar_id: 'bjq4vsjh35qavh79n3im2qchmg@group.calendar.google.com'
  //};

  $scope.ptp = {
    google_key: rl_google_key,
    calendar_id: 'k408le6f3id7pibsbd1tb1qkls@group.calendar.google.com'
  };
  
  //$scope.prl = {
  //  google_key: rl_google_key,
  //  calendar_id: 'kbve9gjj4l5qchs7mtcrp7jg8c%40group.calendar.google.com'
  //};

  //$scope.pulsar = {
  //  google_key: rl_google_key,
  //  calendar_id: 'metob64ta0qoqd7fve8714mrk0@group.calendar.google.com'
  //};

  //$scope.rocket_royale = {
  //  google_key: rl_google_key,
  //  calendar_id: '8jp8agi1pbljjaj4qnns3m4i0c@group.calendar.google.com'
  //};

  $scope.rlcs = {
    google_key: rl_google_key,
    calendar_id: 'ldd0c499r50jljq19kjerkc628@group.calendar.google.com'
  };

  $scope.calendars = function() {
    var merged = [].concat.apply([], $scope.all_calendars);
    //$filter('orderBy')(merged, 'start.startTime');
    return merged;
  };

});
