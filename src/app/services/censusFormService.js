'use strict';

angular.module('censusFormService', [])
    .factory('censusFormService', ['authService', 'config', '$log',
        function(authService, config, $log) {
            //Empty global object, acts as container of entire data model
            var censusForm = {};
            censusForm.observations = [];
            censusForm.disturbances = [];

            censusForm.saveForLater = false;
            censusForm.saveAndMoveNext = false;
            censusForm.saveAndFinish = false;

            //TODO: For now added them to make the UI compatible with the WEB API service.
            //With this, save/update call now works end to end.
            // censusForm.startDate = new Date(2015, 2, 25, 11, 11, 11, 11);
            // censusForm.endDate = new Date(2015, 2, 25, 12, 12, 11, 11);



            // TODO: this is not the best for performance, and these values don't change
            // often. Better to go back to the hard-coded enums. However, the database
            // structure needs to be changed in order to insert hard-coded numbers
            // instead of using identity inserts.
            var enums = {};

            authService.get(config.enums.weather)
                .then(function success(result) {
                    enums.weather = result.data;
                }, function error(result) {
                    $log.error('weather: ', result);
                });
            authService.get(config.enums.waterHeights)
                .then(function success(result) {
                    enums.waterHeights = result.data;
                }, function error(result) {
                    $log.error('waterHeights: ', result);
                });
            authService.get(config.enums.tides)
                .then(function success(result) {
                    enums.tides = result.data;
                }, function error(result) {
                    $log.error('tides: ', result);
                });
            authService.get(config.enums.disturbanceTypes)
                .then(function success(result) {
                    enums.disturbanceTypes = result.data;
                }, function error(result) {
                    $log.error('disturbanceTypes: ', result);
                });
            authService.get(config.enums.habitatTypes)
                .then(function success(result) {
                    enums.habitatTypes = result.data;
                }, function error(result) {
                    $log.error('habitatTypes: ', result);
                });
            authService.get(config.enums.feedingSuccessRates)
                .then(function success(result) {
                    enums.feedingSuccessRates = result.data;
                }, function error(result) {
                    $log.error('feedingSuccessRates: ', result);
                });
            authService.get(config.enums.siteAssessments)
                .then(function success(result) {
                    enums.siteAssessments = result.data;
                }, function error(result) {
                    $log.error('siteAssessments: ', result);
                });
            authService.get(config.enums.vantagePoints)
                .then(function success(result) {
                    enums.vantagePoints = result.data;
                }, function error(result) {
                    $log.error('vantagePoints: ', result);
                });
            authService.get(config.enums.accessPoints)
                .then(function success(result) {
                    enums.accessPoints = result.data;
                }, function error(result) {
                    $log.error('accessPoints: ', result);
                });
            authService.get(config.enums.activityTypes)
                .then(function success(result) {
                    enums.activityTypes = result.data;
                }, function error(result) {
                    $log.error('activityTypes: ', result);
                });

            // behavior??

            return {
                censusForm: censusForm,
                enums: enums
            };
        }
    ]);
