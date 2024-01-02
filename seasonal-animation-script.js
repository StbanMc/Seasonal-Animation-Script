/**
 * Script Name: Seasonal Animation Script
 * Author: E.E. TEAM
 * Created: 2020 | Time Zone: GMT - 5
 * Updated: 2024/01/02
 * Version: 4.4
 * 
 * Description: 
 * This script elegantly generates dynamic, customizable animations that emulate seasonal elements
 * such as snowflakes, leaves, or balloons. It's designed to adapt seamlessly to various browser window
 * sizes and characteristics, providing an engaging user experience. Users can easily customize
 * the animation's element size, color, and frequency to fit their specific needs or seasonal themes.
 * 
 * Ideal for enhancing web pages with a festive or thematic flair, this script brings a touch of
 * creativity and motion to any digital environment.
 * 
 * Usage:
 * Include this script in your HTML file and initialize it with desired options to see the seasonal
 * elements come to life on your webpage.
 * 
 * Example:
 * <script src="path_to_seasonal_animation_script.js"></script>
 * <script>
 *      // Initialize the animation with custom options
 *      seasonalAnimation.start({ size: 20, color: '#FFFFFF', frequency: 500 });
 * </script>
 * 
 * Dependencies: jQuery (version 3.5.x or higher)
 * Compatibility: Most modern web browsers.
 * 
 * Copyright © 2023 by E.E. TEAM. All Rights Reserved.
 * License: Distributed under the GNU General Public License (GPL).
 */

/**
 * Seasonal Animation Object
 * Controls the generation and animation of seasonal elements like snowflakes or leaves.
 * Easily customizable and responsive to screen size.
 *
 * Variables for easy updates and customization:
 * - baseFrequency: Base frequency for desktop devices for element appearances.
 * - minSize: Minimum size of the seasonal elements.
 * - maxSize: Maximum size of the seasonal elements.
 * - elementColor: Default color for the seasonal elements.
 * - elementHTML: HTML content representing the visual aspect of the element (e.g., a snowflake or leaf).
 */

var seasonalObject = {
    requestID: null, // Tracks the ID for the animation frame to enable cancellation.

    /**
     * Initiates and controls the seasonal animation with customizable options.
     * @param {object} options - User-defined customization for the animation.
     */
    startAnimation: function(options) {
        // Clear any existing animation frame and seasonal elements to avoid overlaps.
        if (this.requestID) {
            cancelAnimationFrame(this.requestID);
            $('.seasonalElement').remove();
        }

        var windowWidth = window.innerWidth; // Capture the width of the window for responsive design.
        var baseFrequency = 500; // Base frequency for element appearances on desktop devices.

        // Adjust the frequency of new element appearances based on the window width for responsive design.
        // Smaller screens will have elements appear less frequently.
        this.newOn = baseFrequency * (windowWidth < 768 ? 3 : (windowWidth < 1024 ? 2 : 1));

        // Default configuration for the elements. These can be overridden with user-provided options.
        var defaults = {
            minSize: 10, // Minimum size of the elements.
            maxSize: 25, // Maximum size of the elements.
            elementColor: "#E8E8E8" // Default color of the elements.
        };
        // Extend the defaults with any user-provided options.
        options = $.extend({}, defaults, options);

        // Dimensions of the document to determine animation paths.
        var documentHeight = $(document).height(),
            documentWidth = $(document).width();

        // Function to animate each individual element.
        var animateElement = () => {
            // Define the starting position and size of the element randomly within a range.
            var startPositionLeft = Math.random() * documentWidth - 100,
                sizeElement = options.minSize + Math.random() * options.maxSize,
                endPositionTop = documentHeight - 40,
                swayAmplitude = 100 + Math.random() * 200; // Defines the range of sway motion for elements.

            // Create the element with initial styles and append it to the body.
            var $element = $('<div class="seasonalElement" />').css({
                position: 'absolute',
                top: '-50px',
                left: startPositionLeft,
                opacity: 0.5 + Math.random(),
                fontSize: sizeElement,
                color: options.elementColor,
                zIndex: 2000
            }).html('&#10052;').appendTo('body'); // Use a symbol or image as the element.

            // Animate the element's movement and fading effect.
            $element.animate({
                top: endPositionTop,
                left: "+=" + 100, // Move to the right slightly for a swaying effect.
                opacity: 0.2 // Fade out effect as it falls.
            }, {
                duration: documentHeight * 10 + Math.random() * 5000, // Duration based on document height and randomness.
                easing: 'linear', // Linear easing for a steady fall.
                step: function(now, fx) {
                    // Add sway motion to the falling elements for a more natural look.
                    if (fx.prop === "left") {
                        var sway = swayAmplitude * Math.sin((now + Math.random() * 100) / 100);
                        $(this).css("left", now + sway);
                    }
                },
                complete: function() {
                    // Remove the element once the animation is complete to clean up the DOM.
                    $(this).remove();
                }
            });

            // Schedule the next animation frame to maintain the loop.
            this.requestID = setTimeout(animateElement, this.newOn);
        };

        // Start the animation with the first element.
        this.requestID = setTimeout(animateElement, this.newOn);
    }
};
