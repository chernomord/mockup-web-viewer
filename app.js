var mwvApp = angular.module("mwvApp", ['ngRoute','ngAnimate']);

mwvApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/mockups', {
        templateUrl: 'partials/mockups-list.html',
        controller: 'project'
      }).
      when('/mockups/:mockupName', {
        templateUrl: 'partials/mockup-detail.html',
        controller: 'projectMockup'
      }).
      otherwise({
        redirectTo: '/mockups'
      });
  }]);


mwvApp.factory('dataLoader', function($http) {
  var promise = null;
  return { 
    mainRes: function(url) {
      if (promise) {
        // If we've already asked for this data once,
        // return the promise that already exists.
        return promise;
      } else {
        promise = $http.get(url, [cache=true]);
        return promise;
      }
    }
  }
});


mwvApp.controller('projectRoot', function($scope, dataLoader) {

	dataLoader.mainRes('mockups.json').success(function(data) { 
		$scope.rootTitle = data.projectName;
		$scope.rootIcon = data.projectIcon;
	});

});

mwvApp.controller('project', function($scope, dataLoader) {

	dataLoader.mainRes('mockups.json').success(function(data) { 
		$scope.projectName = data.projectName; 
		$scope.projectSubline = data.projectSubline;
		$scope.mygroups = data.mockupGroups;
	});

});

mwvApp.controller('projectMockup', ['$scope', '$routeParams', 'dataLoader',
  function($scope, $routeParams, dataLoader) {

    dataLoader.mainRes('mockups.json').success(function load (data) {
      $scope.mockupFile = 
        data.mockupGroups[$routeParams.gr].mockups[$routeParams.it].file; 
      image = new Image();
      image.src = $scope.mockupFile;
      $scope.$watch('mockupH', function(newVal, oldVal) {
        $scope.myprop = function() {
            return { height: $scope.mockupH + 'px' };
        };
      }, true);
      image.onload = function() {
          $scope.mockupH = image.naturalHeight; 
          console.log($scope.mockupH);
          $scope.$apply();
        };


    });
    $scope.mockupName = $routeParams.mockupName;
}]);


mwvApp.directive('resize', function ($window) {
    return function (scope, element, attr) {

        var w = angular.element($window);
        scope.$watch(function () {
            return {
                'h': window.innerHeight, 
                'w': window.innerWidth
            };
        }, function (newValue, oldValue) {
            /*console.log(newValue, oldValue);*/
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.resizeWithOffset = function (offsetH) {
                scope.$eval(attr.notifier);
                return { 
                    'height': (newValue.h - offsetH) + 'px'                    
                };
            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
}); 

