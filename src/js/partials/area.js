var currentRegion = 'area';

jQuery(document).ready(function () {
    $('.j-switcher-brokers').prop('checked') ? $('.j-switcher-brokers').prop('checked', false) : $('.j-switcher-brokers').prop('checked', true);
    $('.j-switcher-slider').prop('checked') ? $('.j-switcher-slider').prop('checked', false) : $('.j-switcher-slider').prop('checked', true);
});