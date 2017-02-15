'use strict';

angular.module('roleProxy', [])
    .factory('roleProxy', [
        function() {
            return {

                getAll: function() {
                    /*
                    1	Administrative user		Administrator
                    2	Volunteer data reporter	Reporter
                    3	Project coordinator		Coordinator
                    4	Volunteer team lead		Lead
                    */
                    // Hard-code overrides for FlightNode. Note that Project Coordinator is no longer used.
                   return [
                        { name: 'Administrator', id: 1 },
                        { name: 'Lead', id: 4 },
                        { name: 'Reporter', id: 2 }
                    ];
                }

            };
        }
    ]);
