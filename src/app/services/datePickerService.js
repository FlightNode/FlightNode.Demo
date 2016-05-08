'use strict';

angular.module('datePickerService', [])
    .factory('datePickerService', ['$log',
        function($log) {
            return {

                // TODO: proper js comments
                // collectionName is the model in $scope
                // fieldname is the name of the <input> tag containing the date
                configureDateField: function($scope, collectionName, fieldName) {
                    $scope.today = moment().format('MM/DD/YY');

                    $scope.clear = function() {
                        $scope[collectionName][fieldName] = null;
                    };

                    // Disable weekend selection
                    $scope.disabled = function(date, mode) {
                        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
                    };

                    $scope.toggleMin = function() {
                        $scope.minDate = $scope.minDate ? null : new Date();
                    };
                    $scope.toggleMin();
                    $scope.maxDate = new Date(2020, 5, 22);

                    $scope.open = function() {
                        $log.info('date picker open');
                        $scope.status.opened = true;
                    };

                    $scope.setDate = function(year, month, day) {
                        $log.info('date picker setDate');
                        $scope[collectionName][fieldName] = new Date(year, month, day);
                    };

                    $scope.dateOptions = {
                        formatYear: 'yy',
                        startingDay: 1
                    };

                    $scope.format = 'shortDate';

                    $scope.status = {
                        opened: false
                    };

                    var tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    var afterTomorrow = new Date();
                    afterTomorrow.setDate(tomorrow.getDate() + 2);
                    $scope.events = [{
                        date: tomorrow,
                        status: 'full'
                    }, {
                        date: afterTomorrow,
                        status: 'partially'
                    }];

                    $scope.getDayClass = function(date, mode) {
                        $log.info('date picker getDayClass');
                        if (mode === 'day') {
                            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                            for (var i = 0; i < $scope.events.length; i++) {
                                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                                if (dayToCheck === currentDay) {
                                    return $scope.events[i].status;
                                }
                            }
                        }

                        return '';
                    };
                    return $scope;

                }

            };
        }
    ]);
