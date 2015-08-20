var mwvApp = angular.module("mwvApp", ['ngRoute']);

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

    dataLoader.mainRes('mockups.json').success(function(data) {
      $scope.mockupFile = 
        data.mockupGroups[$routeParams.gr].mockups[$routeParams.it].file; 
    });
    $scope.mockupName = $routeParams.mockupName;

}]);
