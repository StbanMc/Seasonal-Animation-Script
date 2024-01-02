/**
 * Script Name: Seasonal Animation Script
 * Developed by: E.E. TEAM
 * Creation Date: 2020 | (GMT - 5)
 * Description: This script generates a seasonal animation (such as snowflakes, leaves, balloons, etc.)
 *              adapting to the size and characteristics of the browser window.
 *              The animation is customizable in terms of size, color, and frequency of the elements.
 * 
 * Copyright © 2023 E.E. TEAM All Rights Reserved.
 * License: GNU General Public License (GPL)
 */

/**
 * Seasonal Animation Object - Version 5
 * - Code optimization, improved comments, and enhanced documentation for clarity.
 *
 * @property {number} interval - ID for the interval controlling the animation.
 *
 * @method startAnimation - Initiates the seasonal animation.
 *   Clears existing intervals and removes any existing seasonal elements.
 *   Generates customizable seasonal elements falling at random intervals.
 * 
 * @param {object} options - Customization options for the animation.
 *   @property {number} minSize - Minimum size of seasonal elements.
 *   @property {number} maxSize - Maximum size of seasonal elements.
 *   @property {number} newOn - Interval for creating new seasonal elements.
 *   @property {string} elementColor - Color of seasonal elements.
 */
var seasonalObject = {

    interval: null,

    startAnimation: function (options) {
        // Clear existing intervals and elements
        clearInterval(this.interval);
        $('.seasonalElement').remove();

        // Create a placeholder element
        var $element = $('<div id="element" class="seasonalElement" />').css({ 'position': 'absolute', 'top': '-50px', 'z-index': '2000' }).html('PLACEHOLDER'),
            documentHeight = $(document).height(),
            documentWidth = $(document).width(),
            defaults = {
                minSize: 20,
                maxSize: 30,
                newOn: 500,
                elementColor: "#000000"
            },
            options = $.extend({}, defaults, options);

        // Set up the animation interval
        this.interval = setInterval(function () {
            var startPositionLeft = Math.random() * documentWidth - 100,
                startOpacity = 0.5 + Math.random(),
                sizeElement = options.minSize + Math.random() * options.maxSize,
                endPositionTop = documentHeight - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 200,
                durationFall = documentHeight * 10 + Math.random() * 5000;

            // Clone the placeholder element and animate its fall
            $element
                .clone()
                .appendTo('body')
                .css({
                    left: startPositionLeft,
                    opacity: startOpacity,
                    'font-size': sizeElement,
                    color: options.elementColor
                })
                .animate({
                    top: endPositionTop,
                    left: endPositionLeft,
                    opacity: 0.2
                },
                durationFall,
                'linear',
                function () {
                    $(this).remove();
                });
        }, options.newOn);
    }
};
