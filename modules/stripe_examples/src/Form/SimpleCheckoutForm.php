<?php

namespace Drupal\stripe_examples\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class SimpleCheckout.
 *
 * @package Drupal\stripe_examples\Form
 */
class SimpleCheckoutForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'stripe_examples_simple_checkout';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['first'] = [
      '#type' => 'textfield',
      '#title' => $this->t('First name'),
    ];
    $form['last'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Last name'),
    ];
    $form['stripe'] = [
      '#type' => 'stripe',
      '#title' => $this->t('Credit card'),
      // The selectors are gonna be looked within the enclosing form only.
      "#stripe_selectors" => [
        'first_name' => ':input[name="first"]',
        'last_name' => ':input[name="last"]',
      ],
    ];
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Submit'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Display result.
    foreach ($form_state->getValues() as $key => $value) {
      drupal_set_message($key . ': ' . $value);
    }

  }

}
