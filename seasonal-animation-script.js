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
 * Seasonal Animation Object
 * - Handles the generation and animation of seasonal elements.
 *
 * @property {number} requestID - ID for animation frame request.
 *
 * @method startAnimation - Initiates the seasonal animation.
 * @param {object} options - Customization options for the animation.
 *   @property {number} minSize - Minimum size of seasonal elements.
 *   @property {number} maxSize - Maximum size of seasonal elements.
 *   @property {string} elementColor - Color of seasonal elements.
 */
var seasonalObject = {
    requestID: null,

    startAnimation: function (options) {
        // Clear existing animation and elements
        if (this.requestID) {
            cancelAnimationFrame(this.requestID);
            $('.seasonalElement').remove();
        }

        // Default options
        var defaults = {
            minSize: 20,
            maxSize: 30,
            elementColor: "#000000"
        };

        // Merge default and user-provided options
        options = $.extend({}, defaults, options);
        var documentHeight = $(document).height(),
            documentWidth = $(document).width();

        /**
         * Function to animate seasonal elements
         */
        var animateElement = () => {
            var startPositionLeft = Math.random() * documentWidth - 100,
                sizeElement = options.minSize + Math.random() * options.maxSize,
                endPositionTop = documentHeight - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 200;

            $('<div class="seasonalElement" />')
                .css({
                    position: 'absolute',
                    top: '-50px',
                    left: startPositionLeft,
                    opacity: 0.5 + Math.random(),
                    fontSize: sizeElement,
                    color: options.elementColor,
                    zIndex: 2000
                })
                .html('PLACEHOLDER') // Change based on the season
                .appendTo('body')
                .animate({
                    top: endPositionTop,
                    left: endPositionLeft,
                    opacity: 0.2
                }, documentHeight * 10 + Math.random() * 5000, 'linear', function () {
                    $(this).remove();
                });

            this.requestID = requestAnimationFrame(animateElement);
        };

        // Initiate animation
        this.requestID = requestAnimationFrame(animateElement);
    }
};

