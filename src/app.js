var mwvApp = angular.module("mwvApp", ['ngAnimate', 'ngRoute']);

mwvApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/mockups', {
            templateUrl: 'partials/mockups-list.html',
            controller: 'project'
        })
            .when('/mockups/:mockupName', {
                templateUrl: 'partials/mockup-detail.html',
                controller: 'projectMockup',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/mockups'
            });
    }]);


mwvApp.factory('dataLoader', function ($http) {
    var promise = null;
    return {
        mockupsData: function () {
            if (promise) {
                return promise;
            } else {
                promise = $http.get('mockups.json?' + Math.random(), [cache = true]);
                return promise;
            }
        }
    }
});

mwvApp.controller('projectRoot', function ($rootScope, $scope, dataLoader) {

    dataLoader.mockupsData().success(function (data) {

        $scope.rootTitle = data.projectName;
        $scope.rootIcon = data.projectIcon;
    });

});

mwvApp.controller('project', function ($rootScope, $scope, dataLoader) {
    dataLoader.mockupsData().success(function (data) {
        $scope.logo = data.projectIcon;
        $scope.projectName = data.projectName;
        $scope.projectSubline = data.projectSubline;
        $scope.mygroups = data.mockupGroups;
    });

});

var projectMockup = function ($scope, $routeParams, $timeout, dataLoader) {

    var vm = this;

    vm.mockupO = 0;
    vm.imgEmpty = true;
    vm.imgLoaded = false;
    vm.imgLoading = false;
    $timeout(function () {
        vm.imgEmpty = false;
        vm.imgLoading = true;
    }, 10);

    dataLoader.mockupsData().success(function (data) {

        vm.mockup = data.mockupGroups[$routeParams.gr].mockups[$routeParams.it];

        var image = new Image();
        image.src = vm.mockup.file;
        image.onload = function () {
            var wW = window.innerWidth;
            if ( (vm.mockup.media == 'phone') && (wW < image.naturalWidth)) {

                vm.mockupH = image.naturalHeight * wW/image.naturalWidth;
            }
            else {
                vm.mockupH = image.naturalHeight;
            }
            vm.mockupO = 1;
            vm.imgLoading = false;
            vm.imgLoaded = true;
            $scope.$apply();
        };
    });

};

projectMockup.prototype.getImgH = function () {
    var vm = this;
    return {height: vm.mockupH + 'px', opacity: vm.mockupO};
};

projectMockup.$inject = ['$scope', '$routeParams', '$timeout', 'dataLoader'];
mwvApp.controller('projectMockup', projectMockup);


mwvApp.directive('resize', function ($window) {
    return function (scope, element, attr) {

        var w = angular.element($window);
        scope.$watch(function () {
            return {
                'h': window.innerHeight,
                'w': window.innerWidth
            };
        }, function (newValue, oldValue) {

            scope.resizeWithOffset = function (offsetH) {
                // scope.$eval(attr.notifier);
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

