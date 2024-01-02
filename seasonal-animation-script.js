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
 * Seasonal Animation Object - Version 4.3
 * - Code cleanup, enhanced comments, and improved default values for customization.
 *
 * @property {number} requestID - ID for animation frame request.
 *
 * @method startAnimation - Initiates the seasonal animation.
 *   Clears existing animation and removes any existing seasonal elements.
 *   Generates customizable seasonal elements falling at random intervals.
 *   Uses updated default values for customization.
 */
var seasonalObject = {
    requestID: null,

    /**
     * @function startAnimation
     * @description Initiates the seasonal animation.
     * @summary Clears existing animation and elements, then generates customizable seasonal elements.
     * @returns {void}
     */
    startAnimation: function () {
        // Clear existing animation and elements
        if (this.requestID) {
            cancelAnimationFrame(this.requestID);
            $('.seasonalElement').remove();
        }

        // Default values set here
        var documentHeight = $(document).height(),
            documentWidth = $(document).width(),
            minSize = 20,
            maxSize = 30,
            elementColor = "#fff"; // Updated default color

        /**
         * @function animateElement
         * @description Function to animate seasonal elements.
         * @summary Creates and styles seasonal elements, initiating their fall animation.
         * @returns {void}
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
                .html('&#10052;') // Updated placeholder for seasonal element
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
