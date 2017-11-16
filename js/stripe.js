/**
 * @file
 * Provides stripe attachment logic.
 */

(function ($, window, Drupal, drupalSettings, Stripe) {

  'use strict';

  // Create a Stripe client
  var stripe = Stripe(drupalSettings.stripe.apiKey);

  /**
   * Attaches the stripe behavior
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   */
  Drupal.behaviors.stripe = {
    attach: function (context, settings) {

      // Create a Stripe client
      // var stripe = Stripe(settings.stripe.apiKey);

      // Create an instance of Elements
      // var elements = stripe.elements();

      for (var base in settings.stripe.elements) {
        var element = $('#' + base, context)[0];
        if (!element) {
          continue;
        }
        var form = element.form;
        if (!$(form).data('stripe-element')) {
          $(form).data('stripe-element', base);
        }

        // Make sure we only attach the stripe card element a single
        // element per form
        if ($(form).data('stripe-element') == base) {
          // Provide proper scope for closures of each stripe event
          (function(element, form) {
            var stripeSelectors = JSON.parse(element.getAttribute('data-drupal-stripe-selectors'))

            // Create an instance of Elements
            var elements = stripe.elements();

            var options = {};
            if (stripeSelectors && stripeSelectors['address_zip']) {
              options.hidePostalCode = true;
            }

            // Allow other modules to change these options
            $(element).trigger('drupalStripeElementsCreate', ['card', options]);

            // Create an instance of the card Element
            var card = elements.create('card', options);

            // Add an instance of the card Element into the `card-element` <div>
            card.mount('#' + element.id + '-card-element');

            // Handle real-time validation errors from the card Element.
            card.addEventListener('change', function(event) {
              var displayError = document.getElementById(element.id + '-card-errors');
              if (event.error) {
                displayError.textContent = event.error.message;
              } else {
                displayError.textContent = '';
              }
            });

            form.addEventListener('submit', function(event) {
              event.preventDefault();

              var options = {};

              for (var data in stripeSelectors) {
                var selector = stripeSelectors[data];
                if (selector) {
                  options[data] = $(selector, form).val();
                }
              }

              // Name special handling
              options['name'] = '';
              if (options['first_name'] ) {
                options['name'] += options['first_name'];
                if (options['last_name']) {
                  options['name'] += ' ';
                }
              }
              if (options['last_name']) {
                options['name'] += options['last_name'];
              }

              // Allow other modules to change these options
              $(element).trigger('drupalStripeCreateToken', [card, options]);

              stripe.createToken(card, options).then(function(result) {
                if (result.error) {
                  // Inform the user if there was an error
                  var errorElement = document.getElementById(element.id + '-card-errors');
                  errorElement.textContent = result.error.message;
                } else {
                  // Send the token to your server
                  element.setAttribute('value', result.token.id);
                  form.submit();
                }
              });
            });

          }(element, form));
        }
      }
    }
  };

})(jQuery, window, Drupal, drupalSettings, Stripe);
