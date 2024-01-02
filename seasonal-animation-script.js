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
 * Seasonal Animation Object - Version 2
 * - Enhanced code structure and comments for better clarity and documentation.
 *
 * @property {number} requestID - ID for animation frame request.
 *
 * @method startAnimation - Initiates the seasonal animation.
 *   Clears existing animation and elements before starting.
 *   Generates seasonal elements with customizable properties.
 */
var seasonalObject = {
    requestID: null,

    startAnimation: function () {
        // Clear existing animation and elements
        if (this.requestID) {
            cancelAnimationFrame(this.requestID);
            $('.seasonalElement').remove();
        }

        // Retrieve document dimensions and set default options
        var documentHeight = $(document).height(),
            documentWidth = $(document).width(),
            minSize = 20,
            maxSize = 30,
            elementColor = "#000000";

        /**
         * Function to animate seasonal elements
         */
        var animateElement = () => {
            var startPositionLeft = Math.random() * documentWidth - 100,
                sizeElement = minSize + Math.random() * maxSize,
                endPositionTop = documentHeight - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 200;

            // Create and style seasonal element
            $('<div class="seasonalElement" />')
                .css({
                    position: 'absolute',
                    top: '-50px',
                    left: startPositionLeft,
                    opacity: 0.5 + Math.random(),
                    fontSize: sizeElement,
                    color: elementColor,
                    zIndex: 2000
                })
                .html('&#10052;') // Change the content based on the desired seasonal symbol
                .appendTo('body')
                .animate({
                    top: endPositionTop,
                    left: endPositionLeft,
                    opacity: 0.2
                }, documentHeight * 10 + Math.random() * 5000, 'linear', function () {
                    $(this).remove();
                });

            // Continue the animation
            this.requestID = requestAnimationFrame(animateElement);
        };

        // Initiate animation
        this.requestID = requestAnimationFrame(animateElement);
    }
};
