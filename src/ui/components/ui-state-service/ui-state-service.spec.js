describe('blaisdell.services.ui-state', function() {

    'use strict';

    var uiStateService;

    beforeEach(module('blaisdell.services.ui-state'));

    beforeEach(inject(function($injector) {
        uiStateService = $injector.get('uiStateService');
    }));

    it('should default to idle.', function() {

        expect(uiStateService.isIdle()).toBeTruthy();
        expect(uiStateService.isLoading()).toBeFalsy();
    });

    it('should allow a loading state.', function() {

        uiStateService.loading();

        expect(uiStateService.isIdle()).toBeFalsy();
        expect(uiStateService.isLoading()).toBeTruthy();
    });

});
