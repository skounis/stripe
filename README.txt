Stripe (https://stripe.com/) Payment Gateway integration with Drupal.

Description
-----------

This is a development module that provides the bare elememnts and requirements needed to integrate stripe with Drupal 8. It has the necessary libraries dependencies and assets to include.

Look inside for the stripe_examples module for a simple implementation of the features exposed by this module.

Requirements
------------

- Drupal 8.x

Installation
------------

To be installed with composer. TODO: Document better.

Configuration
-------------

Log into your Stripe.com account and visit the "Account settings" area. Click
on the "API Keys" icon, and copy the values for Test Secret Key,
Test Publishable Key, Live Secret Key, and Live Publishable Key and paste them
into the module configuration under admin/config/stripe.
