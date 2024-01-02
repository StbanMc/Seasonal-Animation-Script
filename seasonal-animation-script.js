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
 * This object controls a seasonal animation, generating visual elements that simulate, for example, falling snow.
 * 
 * Updatable Variables:
 * @param {number} newOn - Frequency of new element appearance in milliseconds.
 * @param {object} options - Customization options: minSize, maxSize, elementColor.
 *
 * @property {number} requestID - ID to control animation request. Useful to stop the animation.
 * @property {number} newOn - Frequency of new elements appearing. Default value 500ms.
 *
 * @method startAnimation - Initiates the animation based on provided options.
 */
var seasonalObject = {
    requestID: null,
    newOn: 500, // Frequency of new element appearances (in milliseconds)

    /**
     * Initiates the seasonal animation.
     * Clears any previous animation and existing elements before starting anew.
     * 
     * @param {object} options - Customization options for the animation.
     */
    startAnimation: function (options) {
        // Clear existing animations and elements
        if (this.requestID) {
            cancelAnimationFrame(this.requestID);
            $('.seasonalElement').remove();
        }

        // Default configuration and extended customization options
        var defaults = {
            minSize: 20, // Minimum size of elements
            maxSize: 30, // Maximum size of elements
            elementColor: "#E8E8E8" // Default color of elements
        };
        options = $.extend({}, defaults, options);

        var documentHeight = $(document).height(),
            documentWidth = $(document).width();

        /**
         * Function to animate each individual element.
         * Defines the initial position, size, and animated behavior of each element.
         */
        var animateElement = () => {
            // Defining position and size of elements
            var startPositionLeft = Math.random() * documentWidth - 100,
                sizeElement = options.minSize + Math.random() * options.maxSize,
                endPositionTop = documentHeight - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 200;

            // Creation and animation of the element
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
                .html('&#10052;')  // Seasonal element symbol, modify as needed
                .appendTo('body')
                .animate({
                    top: endPositionTop,
                    left: endPositionLeft,
                    opacity: 0.2
                }, documentHeight * 10 + Math.random() * 5000, 'linear', function () {
                    $(this).remove();
                });

            this.requestID = setTimeout(animateElement, this.newOn);
        };

        // Begin the animation with the first invocation of animateElement
        this.requestID = setTimeout(animateElement, this.newOn);
    }
};

