<?php
  
/**
 * Implements hook_preprocess_node().
 *
 * Override or insert variables into the node templates.
 */
function ddbasic_preprocess_node(&$variables, $hook) {
  
  //
  // Add tpl suggestions for node view modes.
  if (isset($variables['view_mode'])) {
    $variables['theme_hook_suggestions'][] = 'node__view_mode__' . $variables['view_mode'];
    $variables['theme_hook_suggestions'][] = 'node__' . $variables['type'] . '__view_mode__' . $variables['view_mode'];
  }
  
  //
  // Call our own custom preprocess functions.
  $function = 'preprocess__node__' . $variables['type'];
  if (function_exists($function)) {
    call_user_func_array($function, array(&$variables));
  }
  
  // Opening hours on library list. but not on the search page.
  $path = drupal_get_path_alias();
  if (!(strpos($path, 'search', 0) === 0)) {
    $hooks = theme_get_registry(FALSE);
    if (isset($hooks['opening_hours_week']) && $variables['type'] == 'ding_library') {
      $variables['opening_hours'] = theme('opening_hours_week', array('node' => $variables['node']));
    }
  }

  // Add ddbasic_byline to variables.
  $variables['ddbasic_byline'] = t('By: ');

  // Add event node specific ddbasic variables.
  if (isset($variables['content']['#bundle']) && $variables['content']['#bundle'] == 'ding_event') {

    // Add event location variables.
    if (!empty($variables['content']['field_ding_event_location'][0]['#address']['name_line'])) {
      $variables['ddbasic_event_location'] = $variables['content']['field_ding_event_location'][0]['#address']['name_line'] . '<br/>' . $variables['content']['field_ding_event_location'][0]['#address']['thoroughfare'] . ', ' . $variables['content']['field_ding_event_location'][0]['#address']['locality'];
    }
    else {
      // User OG group ref to link back to library.
      if (isset($variables['content']['og_group_ref'])) {
        $variables['ddbasic_event_location'] = $variables['content']['og_group_ref'];
      }
    }

    // Add event date to variables. A render array is created based on the date
    // format "date_only".
    $event_date_ra = field_view_field('node', $variables['node'], 'field_ding_event_date', array(
      'label' => 'hidden',
      'type' => 'date_default',
      'settings' => array(
        'format_type' => 'ding_date_only',
        'fromto' => 'both',
      ),
    ));
    $variables['ddbasic_event_date'] = $event_date_ra[0]['#markup'];

    // Add event time to variables. A render array is created based on the date
    // format "time_only".
    $event_time_ra = field_view_field('node', $variables['node'], 'field_ding_event_date', array(
      'label' => 'hidden',
      'type' => 'date_default',
      'settings' => array(
        'format_type' => 'ding_time_only',
        'fromto' => 'both',
      ),
    ));
    $variables['ddbasic_event_time'] = $event_time_ra[0]['#markup'];
  }

  // Add tpl suggestions for node view modes.
  if (isset($variables['view_mode'])) {
    $variables['theme_hook_suggestions'][] = 'node__view_mode__' . $variables['view_mode'];
  }

  // Add "read more" links to event, news and e-resource in search result view
  // mode.
  if ($variables['view_mode'] == 'search_result') {
    switch ($variables['node']->type) {
      case 'ding_event':
        $more_link = array(
          '#theme' => 'link',
          '#text' => '<i class="icon-chevron-right"></i>',
          '#path' => 'node/' . $variables['nid'],
          '#options' => array(
            'attributes' => array(
              'title' => $variables['title'],
            ),
            'html' => TRUE,
          ),
          '#prefix' => '<div class="event-arrow-link">',
          '#surfix' => '</div>',
          '#weight' => 6,
        );

        $variables['content']['group_right_col_search']['more_link'] = $more_link;
        break;

      case 'ding_news':
        $more_link = array(
          '#theme' => 'link',
          '#text' => t('Read more'),
          '#path' => 'node/' . $variables['nid'],
          '#options' => array(
            'attributes' => array(
              'title' => $variables['title'],
            ),
            'html' => FALSE,
          ),
          '#prefix' => '<span class="news-link">',
          '#surfix' => '</span>',
          '#weight' => 6,
        );

        $variables['content']['group_right_col_search']['more_link'] = $more_link;
        break;

      case 'ding_eresource':
        $more_link = array(
          '#theme' => 'link',
          '#text' => t('Read more'),
          '#path' => 'node/' . $variables['nid'],
          '#options' => array(
            'attributes' => array(
              'title' => $variables['title'],
            ),
            'html' => FALSE,
          ),
          '#prefix' => '<span class="eresource-link">',
          '#surfix' => '</span>',
          '#weight' => 6,
        );

        $variables['content']['group_right_col_search']['more_link'] = $more_link;
        break;
    }
  }

  // For search result view mode move title into left col. group.
  if (isset($variables['content']['group_right_col_search'])) {
    $variables['content']['group_right_col_search']['title'] = array(
      '#theme' => 'link',
      '#text' => decode_entities($variables['title']),
      '#path' => 'node/' . $variables['nid'],
      '#options' => array(
        'attributes' => array(
          'title' => $variables['title'],
        ),
        'html' => FALSE,
      ),
      '#prefix' => '<h2>',
      '#suffix' => '</h2>',
    );
  }

  // Add updated to variables.
  $variables['ddbasic_updated'] = t('!datetime', array(
    '!datetime' => format_date(
      $variables['node']->changed,
      $type = 'long',
      $format = '',
      $timezone = NULL,
      $langcode = NULL
    ))
  );

  // Modified submitted variable.
  if ($variables['display_submitted']) {
    $variables['submitted'] = t('!datetime', array(
      '!datetime' => format_date(
        $variables['created'],
        $type = 'long',
        $format = '',
        $timezone = NULL,
        $langcode = NULL
      ))
    );
  }
}

/**
 * Ding event
 */
function preprocess__node__ding_news(&$variables) {
  $variables['submitted'] = format_date($variables['created'], 'ding_date_only_version2');
}

/**
 * Ding event
 */
function preprocess__node__ding_event(&$variables) {
  
  switch ($variables['view_mode']) {
    case 'teaser':
      $date = field_get_items('node', $variables['node'], 'field_ding_event_date');
      if (!empty($date)) {
        $start_date = strtotime($date[0]['value']);
        $end_date = strtotime($date[0]['value2']);
        
        $variables['event_date'] = format_date($start_date, 'ding_date_only_version2');
        $variables['event_time'] = format_date($start_date, 'ding_time_only');
        // If start and end date days are equal
        if (date('Ymd', $start_date) !== date('Ymd', $end_date)) {
          $variables['event_date'] .= ' - ' . format_date($end_date, 'ding_date_only_version2'); 
        }
        // If start and end date days and time are not equal
        if ($start_date !== $end_date) {
          $variables['event_time'] .= ' - ' . format_date($end_date, 'ding_time_only');
        }
      }
    break;
  }
}