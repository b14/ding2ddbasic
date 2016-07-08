<?php

function ddbasic_form_alter(&$form, &$form_state, $form_id) {
  // Reservations & Bookmarks, group select-all button and action-buttons in div.
  if(
    $form_id == 'ding_reservation_reservations_ready_form' ||
    $form_id == 'ding_reservation_reservations_notready_form' ||
    $form_id == 'ding_bookmark_remove_form' ||
    $form_id == 'ding_bookmark_import_form'
  ) {
    $form['title']['#title'] = "Vælg alle";
    $form['title']['#weight'] = "-30";
    $form['title']['#prefix'] = "<div class='actions-container'><div class='select-all'>";
    $form['title']['#suffix'] = "</div>";
    $form['actions_top']['#suffix'] = "</div></div>";
    $form['actions_top']['delete']['#prefix'] = "<div class='delete-reservations'>";
    if(isset($form['actions_top']['update'])) {
      $form['actions_top']['update']['#prefix'] = "<div class='update-reservations'>";
    }
  }
  if($form_id == 'ding_loan_loans_form') {
  }
  if($form_id == 'profile2_edit_provider_alma_form') {
    //dpm($form);
    //$form['profile_provider_alma']['field_alma_preferred_branch']['#weight'] = '4';
    //$form['profile_provider_alma']['field_alma_interest_period']['#weight'] = '6';
    //$form['profile_provider_alma']['field_alma_reservation_pause']['#weight'] = '5';
    //$form
  }
}

/**
 * Select library list.
 */
function ddbasic_form_ding_library_library_list_select_library_alter(&$form, &$form_state, $form_id) {
  $links = array();
  
  foreach ($form['select_library']['#options'] as $href => $title) {
    $links[] = array(
      'title' => $title,
      'href' => $href,
      'attributes' => array('class' => array('list-item')),
    );
  }
  
  $form['select_library'] = array(
    '#theme' => 'links',
    '#links' => $links,
    '#attributes' => array(
      'class' => array('list-items'),
    ),
    '#heading' => array(
      'text' => t('Select library'),
      'level' => 'h2',
      'class' => array('list-title', 'sub-menu-title'),
    ),
    '#prefix' => '<div class="select-list">',
    '#suffix' => '</div>',
  );
  unset($form['submit']);
} 

/**
 * Search form
 */
function ddbasic_form_search_block_form_alter(&$form, &$form_state, $form_id) {
  $form['search_block_form']['#attributes']['placeholder'] = t('Search the library');
  //$form['search_block_form']['#field_prefix'] = '<i class="icon-search"></i>';
  $form['search_block_form']['#title'] = t('Search the library database and the website');

  // Remove element-invisible
  //unset($form['search_block_form']['#title_display']);
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
/**
 * User login
 */
function ddbasic_form_user_login_alter(&$form, &$form_state, $form_id) {
  
  $form['#attributes']['class'][] = 'user-login-form';
  
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

}

/**
 * Facet browser
 */
function ddbasic_form_ding_facetbrowser_form_alter(&$form, &$form_state, $form_id) {
  foreach (element_children($form) as $key) {
    $item = &$form[$key];
    if($item['#type'] === 'fieldset') {
      $item['#collapsible'] = TRUE;
      $item['#collapsed'] = TRUE;
    }
  }
}


/**
 * Implements hook_preprocess_select().
 *
 * Adds wrapper div to all select form elements, for better styling in FF
 */
function ddbasic_select($variables) {
  $element = $variables['element'];
  element_set_attributes($element, array('id', 'name', 'size'));
  _form_set_class($element, array('form-select'));

  return '<div class="select-wrapper"><select' . drupal_attributes($element['#attributes']) . '>' . form_select_options($element) . '</select></div>';
}



