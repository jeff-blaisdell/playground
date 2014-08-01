(function() {

    'use strict';

    var module = angular.module('blaisdell.services.ui-state', [
    ]);

    module.constant('uiState', {
        LOADING: 'LOADING',
        IDLE: 'IDLE'
    });

    module.service('uiStateService', function(uiState) {

        // Set the default state to none
        var state = uiState.IDLE;

        this.loading = function() {
            state = uiState.LOADING;
        };

        this.idle = function() {
            state = uiState.IDLE;
        };

        this.isLoading = function() {
            return state === uiState.LOADING;
        };

        this.isIdle = function() {
            return state === uiState.IDLE;
        };

    });

})();
