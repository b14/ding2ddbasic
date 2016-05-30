<?php
  
  

/**
 * Implements hook_form_alter().
 */
function ddbasic_form_alter(&$form, &$form_state, $form_id) {
  switch ($form_id) {
    case 'search_block_form':
      $form['search_block_form']['#attributes']['placeholder'] = t('Search the library');
      $form['search_block_form']['#field_prefix'] = '<i class="icon-search"></i>';
      $form['search_block_form']['#title'] = t('Search the library database and the website');

      // Remove element-invisible
      unset($form['search_block_form']['#title_display']);
      break;
  }
}

/**
 * User login form
 */
function ddbasic_form_user_login_block_alter(&$form, &$form_state, $form_id) {
  
  $form['#attributes']['class'][] = 'user-login-form';
  
  $form['close']['#markup'] = '<div class="close-user-login"></div>';
  $form['close']['#weight'] = -9999;
  
  $form['name']['#title'] = t('Loan or social security number');
  $form['name']['#attributes']['placeholder'] = t('Loan/social security number (without dash)');
  $form['name']['#type'] = 'password';

  $form['pass']['#title'] = t('Pincode');
  $form['pass']['#attributes']['placeholder'] = t('Pincode (4 digits)');
  
  $form['links']['#weight'] = 9999;
  $form['links']['#prefix'] = '<div class="form-links">';
  $form['links']['#suffix'] = '</div>';
  
  $form['actions']['submit']['#prefix'] = '<div class="submit-button-with-icon"><div class="color-and-icon"></div>';
  $form['actions']['submit']['#suffix'] = '</div>';
  
  // Temporary hack to get rid of open id links.
  unset($form['openid_links']);
  unset($form['#attached']['js']);

}

