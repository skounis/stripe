<?php

namespace Drupal\stripe;

use Symfony\Component\EventDispatcher\Event;

/**
 * Wraps a stripe event for webhook.
 */
class StripeWebhookEvent extends Event {

  /**
   * Stripe API event object.
   *
   * @var \Stripe\Event
   */
  protected $event;

  /**
   * Constructs a Stripe Webhook Event object.
   *
   * @param \Stripe\Event $event
   *   Stripe API event object object.
   */
  public function __construct(\Stripe\Event $event) {
    $this->event = $event;
  }

  /**
   * Gets Stripe API event object.
   *
   * @return \Stripe\Event
   *   The Stripe API event object
   */
  public function getEvent() {
    return $this->event;
  }
}
