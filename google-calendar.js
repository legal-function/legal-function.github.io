angular.module('GoogleCalendar', []).directive('googleCalendar', function(){
  return {
    restrict: 'E',
    scope: {
      gcConfig: '=',
      hash: '=?'
    },
    templateUrl: 'google-calendar.html',
    controller: ['$filter', '$http', '$scope', function($filter, $http, $scope){

      if (!$scope.gcConfig.google_key) {
        throw('Missing required config google_key');
      }

      if (!$scope.gcConfig.calendar_id) {
        throw('Missing required config calendar_id');
      }

      /**
       * Must check if ngSanitize is
       * a part of the project for
       * binding description html
       */
      try {
        angular.module("ngSanitize");
        sanitize =  true;
      } catch (err) {
        sanitize = null;
      }

      var defaults = {
        max: 3,
        hideTitle: false,
        sanitize: sanitize,
        dateTimeFilter: 'd. MMM HH.mm',
        dateFilter: 'd. MMM',
        htmlDesc: true,
        calendar_name: false
      };

      $scope.gcConfig = angular.extend(defaults, $scope.gcConfig);

      /**
       * TODO: Debug filter used by multiple use of the directive
       * There is some weird issues with filter if the directive
       * is used multiple times with different config for filter..
       * for some reason the last passed filters is used for every use
       * of the directive
       */
      fulldayFilter = function(date) {
        return $filter('date')(date, $scope.gcConfig.dateFilter)
      };

      timedFilter = function(date) {
        return $filter('date')(date, $scope.gcConfig.dateTimeFilter);
      };


      $scope.start = function(event){
        if (event.start.date) {
          return fulldayFilter(event.start.date);
        } else if (event.start.dateTime) {
          return timedFilter(event.start.dateTime);
        }
      };

      $scope.end = function(event){
        /**
         * The end date is off by one in google for entire day events
         * so we need to substract one day
         */
        if (event.end.date) {
          var d = new Date(event.end.date);
          d.setDate(d.getDate() - 1);
          return fulldayFilter(d);
        } else if (event.end.dateTime) {
          return timedFilter(event.end.dateTime);
        }

      };

      var url = "https://www.googleapis.com/calendar/v3/calendars/" + $scope.gcConfig.calendar_id + "/events?orderBy=startTime&singleEvents=true&timeMin=" + (new Date().toISOString()) + "&maxResults=" + $scope.gcConfig.max + "&key=" + $scope.gcConfig.google_key;

      $http.get(url).success(function(data){
        $scope.calendar = data;
        if (!$scope.gcConfig.hideTitle && !$scope.gcConfig.calendar_name)
          angular.extend($scope.gcConfig, { calendar_name: data.summary })

        angular.forEach($scope.calendar.items, function(item) {
          item.startTime = $scope.start(item);
          item.endTime =  $scope.end(item);
          if (item.start.date) {
            item.startDate = new Date(item.start.date);
          } else {
            item.startDate = new Date(item.start.dateTime);
          };
        });
        $scope.$parent.all_calendars.push($scope.calendar.items);
      });
    }
    ]
  };
});
