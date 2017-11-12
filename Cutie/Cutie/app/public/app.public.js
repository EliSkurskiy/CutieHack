(function () {
    'use strict';

    window.APP = window.APP || {};
    APP.NAME = "lostNFound";

    angular
        .module(APP.NAME, [
            'ui.router',
            APP.NAME + '.routes',
            'toastr'

        ]);

})();

(function () {
    'use strict';

    var app = angular.module(APP.NAME + '.routes', []);

    app.config(_configureStates)

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
                    templateUrl: '/app/public/FoundItem/View/map.html'
                    , controller: 'mapController as mapCtlr'
                }
                
            }
        };

        $stateProvider.state("pub", initialPublicStates);

        var main = {
            url: 'main'
            , title: 'Register'
            , template: 'Hello'
            , controller: 'mainController as mainCtrl'

        };
        $stateProvider.state('pub.main', main);

        var found = {
            url: 'image'
            , title: 'found'
            , templateUrl: 'app/public/FoundItem/View/ImageUpload.html'
            , controller: 'foundController as foundVm'
            , params: {
                itemId: null
            }
        };
        $stateProvider.state('pub.image', found);

        var image = {
            url: 'found'
            , title: 'Image'
            , templateUrl: 'app/public/FoundItem/View/foundItemForm.html'
            , controller: 'foundController as foundVm'
        };
        $stateProvider.state('pub.found', image);

        var lost = {
            url: 'lost'
            , title: 'Records'
            , template: 'Hello'
            , controller: 'mainController as mainCtrl'
        };
        $stateProvider.state('pub.lost', lost);



    }

})();

(function () {
    'use strict'
    angular.module(APP.NAME)
        .factory("mainService", MainService);

    MainService.$inject = ['$http']

    function MainService($http) {

        return {
            addMissingItem: _addMissingItem
            , getAll: _getMissingItems
        }

        function _uploadImage(data, onSuccess, onError) {
            var settings = {
                url: "/api/items"
                , method: "POST"
                , cache: false
                , contentType: 'json'
                , withCredentials: true
                , data: data
            };
            return $http(settings)
                .then(onSuccess, onError)
        }

        function _addMissingItem(data, onSuccess, onError) {
            var settings = {
                url: "/api/items"
                , method: "POST"
                , cache: false
                , contentType: 'json'
                , withCredentials: true
                , data: data
            };
            return $http(settings)
                .then(onSuccess, onError)
        }

        function _getMissingItems(onSuccess, onError) {
            var settings = {
                url: "/api/items"
                , method: "GET"
                , cache: false
                , contentType: 'json'
                , withCredentials: true
            };
            return $http(settings)
                .then(onSuccess, onError)
        }


    }



})();

(function () {
    'use strict'

    angular.module(APP.NAME)
        .controller("mainController", MainController);

    MainController.$inject = ['$log', "$stateParams", "$state", 'mainService', 'toastr']


    function MainController($log, $stateParams, $state, mainService, toastr) {

        var vm = this




    }
})();
(function () {
    'use strict'

    angular.module(APP.NAME)
        .controller("foundController", FoundController);

    FoundController.$inject = ['$log', "$stateParams", "$state", 'mainService', 'toastr']


    function FoundController($log, $stateParams, $state, mainService, toastr) {
        $stateParams;
        debugger
        var vm = this

        vm.onSubmitBtnClicked = _onSubmitBtnClicked;
        vm.uploadImage = _uploadImage;

        var UCR = {
            "Lot 13": {
                lat: 33.974906
                , lng: -117.320077
            },
            "Bourns College of Engineering": {
                lat: 33.975265
                , lng: -117.32594
            },
            "Department of Chemical and Environmental Engineering": {
                lat: 33.975675
                , lng: -117.327226
            },
            "University of California Riverside Official Bookstore": {
                lat: 33.975178
                , lng: -117.328179
            },
            "Parking Lot 19": {
                lat: 33.975532
                , lng: -117.329852
            },
            "UCR Graduate School of Education": {
                lat: 33.972751
                , lng: -117.329757
            },
            "Bell Tower": {
                lat: 33.973428
                , lng: -117.328161
            }
        };




        vm.found = null;
        function _uploadImage() {

        }
        function _uploadImageSuccess() {

        }
        function _uploadImageError() {

        }



        function _onSubmitBtnClicked(isValid) {
            debugger

            if (isValid) {
                vm.found.lat = UCR[vm.found.location].lat
                vm.found.lng = UCR[vm.found.location].lng
                mainService.addMissingItem(vm.found, _onAddItemSuccess, _onAddItemError);

            }

            else {
                toastr.error("Oops!");
            }
        }

        function _onAddItemSuccess(response) {

            toastr.success("Item Submitted");

            debugger
        };
        function _onAddItemError(response) {

        };



    }
})();

(function () {
    'use strict'

    angular.module(APP.NAME)
        .controller("LostController", LostController);

    LostController.$inject = ['$log', "$stateParams", "$state", 'mainService', 'toastr']


    function LostController($log, $stateParams, $state, mainService, toastr) {

        var vm = this




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
    'use strict';

    angular
        .module(APP.NAME)
        .controller('navController', navController);

    navController.$inject = ['$location'];

    function navController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'navController';

        activate();

        function activate() { }
    }
})();
(function () {
    "use strict";

    angular.module(APP.NAME)
        .controller('mapController', MapController)

    MapController.$inject = ['$log', '$state', '$stateParams', '$scope', 'mainService'];

    function MapController($log, $state, $stateParams, $scope, mainService) {
        var vm = this;

        vm.ucrLat = 33.9737;
        vm.ucrLng = 117.3281;
        var Domain = "https://sabio-training.s3-us-west-2.amazonaws.com/";
        //vm.onRemoveRouteClicked = _onRemoveRouteClicked;
        //vm.onDisplayRoute = _onDisplayRoute;

        var UCR = {
            "Lot 13": {
                lat: 33.974906
                , long: -117.320077
            },
            "Bourns College of Engineering": {
                lat: 33.975265
                , long: -117.32594
            },
            "Department of Chemical and Environmental Engineering": {
                lat: 33.975675
                , long: -117.327226
            },
            "University of California Riverside Official Bookstore": {
                lat: 33.975178
                , long: -117.328179
            },
            "Parking Lot 19": {
                lat: 33.975532
                , long: -117.329852
            },
            "UCR Graduate School of Education": {
                lat: 33.972751
                , long: -117.329757
            },
            "Bell Tower": {
                lat: 33.973428
                , long: -117.328161
            }
        };

        vm.addressData = {};
        vm.mealIdsArr = [];
        vm.mealIds = {};
        vm.maxDistance = 10;
        vm.showRemoveRouteBtn = false;
        var _markers = {};
        var _openMarkers = {};
        var directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true
        });// also, constructor can get "DirectionsRendererOptions" object
        var directionsService = new google.maps.DirectionsService();

        vm.$onInit = _onInit;

        function _onInit() {
            vm.searchTerm = $stateParams.searchTerm;

            initMap();
            mainService.getAll(_getAllSuccess, _getAllError);
        };

        function initMap() {
            vm.ucrLat = 33.9737;
            vm.ucrLng = -117.3281;

            var originCoords = { lat: vm.ucrLat, lng: vm.ucrLng };
            vm.map = new google.maps.Map(document.getElementById('map'), { center: originCoords, zoom: 16 });
            vm.geocoder = new google.maps.Geocoder();
            vm.bounds = new google.maps.LatLngBounds();
        };

        function _getAllSuccess(response) {
            vm.items = response.data.Items;
            showMeals(vm.items, vm.map, vm.bounds);


        }

        function _getAllError(response) {

        }

        function getOriginCoords(address, geocoder) {
            geocoder.geocode({ 'address': address }, geocodeHandler);
        };

        function geocodeHandler(results, status) {
            if (status === 'OK') {
                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();

                setOriginMarker(vm.addressData);


            }
            else {

            }
        };


        function showMeals(positions, targetMap, mapBounds) {

            for (var i = 0; i < positions.length; i++) {
                var currentPosition = positions[i];

                var m = setMarker(currentPosition, targetMap, mapBounds);

            };

        };

        function setOriginMarker(position) {
            var originCoords = { lat: vm.ucrLat, lng: vm.ucrLng };
            new google.maps.Marker({ position: originCoords, map: vm.map, animation: google.maps.Animation.BOUNCE })
            vm.map.setCenter(new google.maps.LatLng(originCoords.lat, originCoords.lng));

        };

        function setMarker(currentPosition, targetMap, mapBounds) {
            var coords = { lat: currentPosition.Lat, lng: currentPosition.Lng };
            var marker = new google.maps.Marker({ position: coords, map: targetMap, icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' });
            marker.data = currentPosition;
            setInfoWindow(marker, targetMap);
            google.maps.event.addListener(marker, 'click', _onMarkerClicked);
            return marker;
        };

        var content = '<div id="iw-container">' +
            '<div class="iw-title">' + 'hi' + '/div>' +
            '<div class="iw-content">' +
            '<div class="iw-subTitle">History</div>' +
            '<img src="' + 'http://maps.marnoto.com/en/5wayscustomizeinfowindow/images/vistalegre.jpg' + '" alt="Porcelain Factory of Vista Alegre" height="115" width="83">' +
            '<p>' + 'Founded in 1824, the Porcelain Factory of Vista Alegre was the first industrial unit dedicated to porcelain production in Portugal. For the foundation and success of this risky industrial development was crucial the spirit of persistence of its founder, José Ferreira Pinto Basto. Leading figure in Portuguese society of the nineteenth century farm owner, daring dealer, wisely incorporated the liberal ideas of the century, having become "the first example of free enterprise" in Portugal.' + '</p>' +
            '<div class="iw-subTitle">' + 'Contacts' + '</div>' +
            '<p>VISTA ALEGRE ATLANTIS, SA<br>3830-292 Ílhavo - Portugal<br>' +
            '<br>Phone. +351 234 320 600<br>e-mail: geral@vaa.pt<br>www: www.myvistaalegre.com</p>' +
            '</div>' +
            '<div class="iw-bottom-gradient"></div>' +
            '</div>';


        function setInfoWindow(marker, targetMap) {
            var infoWindow = new google.maps.InfoWindow({});
            marker.infoWindow = infoWindow;


            var content =
                '<div>' +
                '<div> Item: ' + marker.data.Title + '</div>' +
                '<div>' +
                '<div> Person who found item: ' + marker.data.Name + '</div>' +
                '<p>Description: ' + marker.data.Description + '</p>' +
                '<p>Location: ' + marker.data.Location + '<br>' +
                '</div>';
            marker.infoWindow.setContent(content);

        };

        function _onMarkerClicked() {
            var thisMarker = this;
            thisMarker.infoWindow.open(thisMarker.map, thisMarker);
            _openMarkers[thisMarker.data.mealId] = []
        };
        //on map ready
        function _onMapReady() {
            var map = this;
            map.addListener("idle", function () {
                var bounds = map.getBounds();
                var radius = Math.round(_getBoundsRadius(bounds));
                _onIdleEvent(map.getCenter().lat(), map.getCenter().lng(), radius);
                //mealService.getMealPositions(vm.map.getCenter().lat(), vm.map.getCenter().lng(), dist, onGetMapMealPositionsSuccess, onGetMealPositionsError);
            });
        }

        function _onIdleEvent(centerLat, centerLng, radius) {
            //mealService.getMealPositions(centerLat, centerLng, radius, onGetMapMealPositionsSuccess, onGetMealPositionsError);
        }

        function _getBoundsRadius(bounds) {
            var center = bounds.getCenter();
            var ne = bounds.getNorthEast();

            // r = radius of the earth in statute miles
            var r = 3963.0;

            // Convert lat or lng from decimal degrees into radians (divide by 57.2958)
            var lat1 = center.lat() / 57.2958;
            var lon1 = center.lng() / 57.2958;
            var lat2 = ne.lat() / 57.2958;
            var lon2 = ne.lng() / 57.2958;

            // distance = circle radius from center to Northeast corner of bounds
            var dis = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) +
                Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));

            return dis;
        }

        function _onDisplayRoute(mealLat, mealLng) {

            var start = new google.maps.LatLng(vm.addressData.lat, vm.addressData.lng);
            var end = new google.maps.LatLng(mealLat, mealLng);

            directionsDisplay.setMap(vm.map); // map should be already initialized.

            directionsDisplay.setPanel(document.getElementById('right-panel'));

            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
            vm.showRemoveRouteBtn = true;
        }

        function _closeOpenInfoWindows() {
            if (_markers) {
                for (var key in _markers) {
                    _marker[key].infoWindow.close();
                }
            }
        }

        function _onRemoveRouteClicked() {
            directionsDisplay.setMap(null);
            directionsDisplay.setPanel(null);
            vm.showRemoveRouteBtn = false;
        }
    };
})();