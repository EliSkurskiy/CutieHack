(function () {
    'use strict';

    window.APP = window.APP || {};
    APP.NAME = "publicApp";

    angular
        .module(APP.NAME, [
            'ui.router',
            APP.NAME + '.routes'
        ]);

})();

(function () {

    'use strict';

    var app = angular.module(APP.NAME + '.routes', []);

    app
        .config(_configureStates)
    
    _configureStates.$inject = ['$stateProvider', '$locationProvider'];

    function _configureStates($stateProvider, $locationProvider, $http) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        var initialPublicStates = {
            url: '/',
            params: {
                role: null
            },
            //abstract: true,
            views: {
                'splash': {
                    template: '<div ui-view>HOME</div>'
                    , controller: 'splashPubController as splashPubCtlr'
                }
            }
        };

        $stateProvider.state("pub", initialPublicStates);
        
        var registrationSettings = {
            url: 'register',
            params: {
                user: null
            },
            title: 'Registration',
            controller: 'RegisterController as registerVm',
            templateUrl: '/app/public/user/views/registration.html'
        };

        $stateProvider.state('pub.register', registrationSettings);

        

    }

})();


(function () {
    "use strict";

    angular.module(APP.NAME)
        .controller('splashPubController', SplashPubController)

    SplashPubController.$inject = ['$log', '$http', '$scope', '$state', '$timeout', '$window']

    function SplashPubController($log, $http, $scope, $state, $timeout, $window) {

        var vm = this;
        
    };

})(); 


(function () {

    angular.module(APP.NAME)
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$log', '$window', '$stateParams', '$state', 'userService'];

    function RegisterController($log, $window, $stateParams, $state, userService) {

        var vm = this;

        vm.registerContent = {};
        vm.registrationForm;
        vm.onRegisterBtnClicked = _onRegisterBtnClicked;
        vm.editMode = false;
        vm.userId = null;

        vm.hasValidationError = _hasValidationError;
        vm.showValidationErrors = _showValidationErrors;
        vm.showErrorMessage = _showErrorMessage;

        vm.$onInit = _onInit;

        vm.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        vm.passwordFormat = /^(?=.*[0-9]).{6,}$/;
        vm.numberFormat = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
        vm.zipcodeFormat = /^\d{5}$|^\d{5}-\d{4}$/;


        function _onInit() {
            vm.userId = $stateParams.user;
            debugger;
            if (vm.userId) {
                vm.editMode = true;
                userService.getUser(vm.userId, _onGetUserSuccess, _onGetUserError);
            }
        };


        function _onRegisterBtnClicked() {

            if (vm.registrationForm.$invalid) {
                return;
            } else {
                if (!vm.editMode) {
                    userService.addUser(vm.registerContent, _onRegisterSuccess, _onRegisterError);
                } else {
                    userService.editUser(vm.registerContent, _onUpdateSuccess, _onUpdateError);
                }
                
            }

        }

        function _onGetUserSuccess(response) {
            if (response && response.data) {
                $log.log("Success");
                vm.registerContent = response.data.item;
                vm.registerContent.id = vm.userId;
            } else {
                $log.log("Unable to connect with server. Error Failed.");
            }
        }

        function _onGetUserError(response) {
            if (response && response.error) {
                $log.log("Post Failed");
            } else {
                $log.log("Unable to connect with server. Post Failed.");
            }
        }

        function _onRegisterSuccess(response) {
            if (response && response.data.item) {
                $log.log("Success");
                $state.go("pub.list");
            } else {
                $log.log("Unable to connect with server. Error Failed.");
            }
        }

        function _onRegisterError(response) {
            if (response && response.error) {
                $log.log("Post Failed");
            } else {
                $log.log("Unable to connect with server. Post Failed.");
            }
        }


        //update
        function _onUpdateSuccess(response) {
            if (response && response.data) {
                $log.log("Success");
                debugger;
                $state.go("pub.list");
            } else {
                $log.log("Unable to connect with server. Error Failed.");
            }

        };

        

        function _onUpdateError(response) {
            $log.log(response);
            if (response && response.error) {
                $log.log("Update Failed");
            } else {
                $log.log("Unable to connect with server. Update Failed.");
            }

        };

        function _hasValidationError(propertyName) {
            return (vm.registrationForm.$submitted || (vm.registrationForm[propertyName].$dirty && vm.registrationForm[propertyName].$touched))
                && vm.registrationForm[propertyName].$invalid;
        }

        function _showValidationErrors(propertyName) {
            return (vm.registrationForm.$submitted || (vm.registrationForm[propertyName].$dirty && vm.registrationForm[propertyName].$touched));
        };

        function _showErrorMessage(propertyName, ruleName) {
            return vm.registrationForm[propertyName].$error[ruleName];
        }


    }


})();




(function () {

    angular.module(APP.NAME)
        .factory("userService", UserService);

    UserService.$inject = ['$http'];

    function UserService($http) {
        var apiRoute = "/api/users/";

        var svc = {};
        svc.addUser = _addUser;
        svc.getAllUsers = _getAllUsers;
        svc.deleteUser = _deleteUser;
        svc.editUser = _editUser;
        svc.getUser = _getUser;


        return svc;
        

        function _addUser(data, onSuccess, onError) {
            var settings = {
                url: apiRoute + "register",
                method: 'POST',
                cache: false,
                contentType: 'application/json; charset=UTF-8',
                withCredentials: true,
                data: JSON.stringify(data)
            };
            return $http(settings)
                .then(onSuccess, onError);
        }

        function _editUser(data, onSuccess, onError) {
            var settings = {
                url: apiRoute + data.id,
                method: 'PUT',
                cache: false,
                contentType: 'application/json; charset=UTF-8',
                withCredentials: true,
                data: JSON.stringify(data)
            };
            return $http(settings)
                .then(onSuccess, onError);
        }

        function _deleteUser(id, onSuccess, onError) {
            var settings = {
                url: apiRoute + id,
                method: 'DELETE',
                cache: false,
                contentType: 'application/json; charset=UTF-8',
                withCredentials: true
            };
            return $http(settings)
                .then(onSuccess, onError);
        }

        function _getUser(id, onSuccess, onError) {
            var settings = {
                url: apiRoute + id,
                method: 'GET',
                cache: false,
                contentType: 'application/json; charset=UTF-8',
                withCredentials: true
            };
            return $http(settings)
                .then(onSuccess, onError);
        }

        function _getAllUsers(onSuccess, onError) {
            var settings = {
                url: apiRoute,
                method: 'GET',
                cache: false,
                contentType: 'application/json; charset=UTF-8',
                withCredentials: true
            };
            return $http(settings)
                .then(onSuccess, onError);
        }

    }

})();

(function () {

    angular
        .module(APP.NAME)
        .directive('compareTo', compareTo);

    compareTo.$inject = ['$rootScope'];

    function compareTo($rootScope) {
        var directive =  {
            require: "ngModel",
            scope: {
                confirmPassword: '=compareTo'
            },
            link: _link
        };

        return directive;

        function _link (scope, element, attributes, modelValue) {

            modelValue.$validators.compareTo = function (val) {
                return val === scope.confirmPassword;
            };

            scope.$watch("confirmPassword", function () {
                modelValue.$validate();
            });
        }



    }



})();