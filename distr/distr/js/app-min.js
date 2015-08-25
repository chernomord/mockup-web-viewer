
var mwvApp = new angular.module("mwvApp", ['ngAnimate','ngRoute']);

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
    mockupsData: function() {
      if (promise) {
        // If we've already asked for this data once,
        // return the promise that already exists.
        return promise;
      } else {
        promise = $http.get('mockups.json', [cache=true]);
        return promise;
      }
    }
  }
});



mwvApp.controller('projectRoot', function($rootScope, $scope, dataLoader) {

	dataLoader.mockupsData().success(function(data) { 
    
		$scope.rootTitle = data.projectName;
		$scope.rootIcon = data.projectIcon;
	});

});

mwvApp.controller('project', function($rootScope, $scope, dataLoader) {
	dataLoader.mockupsData().success(function(data) { 
    $scope.logo = data.projectIcon;
		$scope.projectName = data.projectName; 
		$scope.projectSubline = data.projectSubline;
		$scope.mygroups = data.mockupGroups;
	});

});

mwvApp.controller('projectMockup', ['$scope', '$routeParams', '$timeout', 'dataLoader', 
  function($scope, $routeParams, $timeout, dataLoader) {
    
    $scope.mockupO=0;
    $scope.imgEmpty= true;
    $scope.imgLoaded = false;
    $scope.imgLoading = false;
    $timeout(function(){ $scope.imgEmpty= false; $scope.imgLoading = true; }, 10); 

    dataLoader.mockupsData().success(function (data) {
      $scope.mockupSrc = 
        data.mockupGroups[$routeParams.gr].mockups[$routeParams.it].file; 
      image = new Image();
      image.src = $scope.mockupSrc;
     
      $scope.getImgH = function() {
        return { height: $scope.mockupH + 'px', opacity: $scope.mockupO };
      };

      image.onload = function() {
        $scope.mockupH = image.naturalHeight; 
        $scope.mockupO = 1;
        $scope.imgLoading = false; $scope.imgLoaded = true;
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


