'use strict';

/**
 * @ngdoc function
 * @name flightNodeApp.controller:LocationListController
 * @description
 * # LocationListController
 * Controller for the user list page.
 */
angular.module('flightNodeApp')
	.controller('LocationListController',
	 ['$scope', '$http', '$log', 'messenger', '$location', 'authService',
		function ($scope, $http, $log, messenger, $location, authService) {

			// TODO: when not authorized, an error about uiGrid will
			// appear on the screen, probably because it tries to load
			//  the view before changing the location path. Is there a
			//  better place to put this? Perhaps something in the routing
			//  to intercept the route and direct traffic by permission?
			if (!(authService.isAdministrator() ||
				  authService.isCoordinator())) {
				$log.warn('not authorized to access this path');
				$location.path('/');
				return;
			}

			$scope.loading = true;

			$scope.list = [];

			authService.get('http://localhost:50323/api/v1/locations')
						.then(function success(response) {

							$scope.list = response.data;

						}, function error(response) {

                            messenger.displayErrorResponse($scope, response);

						});

			$scope.gridOptions = {
				enableFiltering: true,
				rowTemplate: 'app/views/row.html',
				onRegisterApi: function (gridApi) {
					$scope.gridApi = gridApi;
				},
				data: 'list',
				columnDefs: [
					{ name: 'description', displayName: 'Description' },
					{ name: 'latitude', displayName: 'Latitude' },
					{ name: 'longitude', displayName: 'Longitude' },
					{
						name: 'id',
						displayName: '',
						cellTemplate: '<div class="ui-grid-cell-contents" title="Edit"><a href="/#/locations/{{row.entity.id}}">Edit</a></div>' 
					}
				]
			};

			$scope.creatlocation = function () {
				$location.path("/locations/new");
			}

			$scope.loading = false;

		}]);