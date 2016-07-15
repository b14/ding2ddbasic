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
    //$event_date_ra = field_view_field('node', $variables['node'], 'field_ding_event_date', array(
    //  'label' => 'hidden',
    //  'type' => 'date_default',
    //  'settings' => array(
    //    'format_type' => 'ding_date_only',
    //    'fromto' => 'both',
    //  ),
    //));
    //$variables['ddbasic_event_date'] = $event_date_ra[0]['#markup'];

    // Add event time to variables. A render array is created based on the date
    // format "time_only".
    //$event_time_ra = field_view_field('node', $variables['node'], 'field_ding_event_date', array(
    //  'label' => 'hidden',
    //  'type' => 'date_default',
    //  'settings' => array(
    //    'format_type' => 'ding_time_only',
    //    'fromto' => 'both',
    //  ),
    //));
    //$variables['ddbasic_event_time'] = $event_time_ra[0]['#markup'];
  }

  // Add tpl suggestions for node view modes.
  if (isset($variables['view_mode'])) {
    $variables['theme_hook_suggestions'][] = 'node__view_mode__' . $variables['view_mode'];
  }

  // Add "read more" links to event, news and e-resource in search result view
  // mode.
  //
  // @B14 outcommentet
  //if ($variables['view_mode'] == 'search_result') {
  //  
  //  switch ($variables['node']->type) {
  //    case 'ding_event':
  //      $more_link = array(
  //        '#theme' => 'link',
  //        '#text' => '<i class="icon-chevron-right"></i>',
  //        '#path' => 'node/' . $variables['nid'],
  //        '#options' => array(
  //          'attributes' => array(
  //            'title' => $variables['title'],
  //          ),
  //          'html' => TRUE,
  //        ),
  //        '#prefix' => '<div class="event-arrow-link">',
  //        '#surfix' => '</div>',
  //        '#weight' => 6,
  //      );
  //
  //      $variables['content']['group_right_col_search']['more_link'] = $more_link;
  //      break;
  //
  //    case 'ding_news':
  //      $more_link = array(
  //        '#theme' => 'link',
  //        '#text' => t('Read more'),
  //        '#path' => 'node/' . $variables['nid'],
  //        '#options' => array(
  //          'attributes' => array(
  //            'title' => $variables['title'],
  //          ),
  //          'html' => FALSE,
  //        ),
  //        '#prefix' => '<span class="news-link">',
  //        '#surfix' => '</span>',
  //        '#weight' => 6,
  //      );
  //
  //      $variables['content']['group_right_col_search']['more_link'] = $more_link;
  //      break;
  //
  //    case 'ding_eresource':
  //      $more_link = array(
  //        '#theme' => 'link',
  //        '#text' => t('Read more'),
  //        '#path' => 'node/' . $variables['nid'],
  //        '#options' => array(
  //          'attributes' => array(
  //            'title' => $variables['title'],
  //          ),
  //          'html' => FALSE,
  //        ),
  //        '#prefix' => '<span class="eresource-link">',
  //        '#surfix' => '</span>',
  //        '#weight' => 6,
  //      );
  //
  //      $variables['content']['group_right_col_search']['more_link'] = $more_link;
  //      break;
  //  }
  //}

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
  // dpm($variables);
}

/**
 * Ding news
 */
function preprocess__node__ding_news(&$variables) {
  
  $variables['news_submitted'] = format_date($variables['created'], 'ding_date_only_version2');
  $variables['news_full_submitted'] = format_date($variables['created'], 'ding_date_and_time');
  $variables['news_full_changed'] = format_date($variables['changed'], 'ding_date_and_time');
  switch ($variables['view_mode']) {
    case 'full':
      array_push($variables['classes_array'], 'node-full');
      
      //Make social-share button
      $share = '
        <div class="social-share-container">
          <div class="inner">
            <div class="label">' . t('Share this news') . '</div>
            <div class="share-buttons">
              <a href="#" class="fb-share">Facebook</a>
              <a href="#" class="twitter-share">Twitter</a>
              <a href="#" class="mail-share">E-mail</a>
            </div>
          </div>
        </div>
      ';
      $variables['share_button'] = $share;
    break;
    case 'teaser':
      // Get image url to use as background image
      $uri = $variables['field_ding_news_list_image'][0]['uri'];
      if (!empty($uri)) {
        // If in view with large first teaser and first in view
        $current_view = $variables['view']->current_display;
        $views_with_large_first = array('ding_news_frontpage_list', 'ding_news_list');
        if(in_array($current_view, $views_with_large_first) && $variables['view']->result[0]->nid == $variables['nid']) {
          $img_url = image_style_url('ding_panorama_list_large_wide', $uri);
        } else {
          $img_url = image_style_url('ding_panorama_list_large', $uri);
        }
        $variables['news_teaser_image'] = '<div class="ding-news-list-image image-styling-16-9" style="background-image:url(' . $img_url . ')"></div>';
      } else {
        $variables['news_teaser_image'] = '<div class="ding-news-list-image image-styling-16-9"></div>';
      }
      
      // If in view with large first teaser and first in view
      //$current_view = $variables['view']->current_display;
      //$views_with_large_first = array('ding_news_frontpage_list', 'ding_news_list');
      //if(in_array($current_view, $views_with_large_first) && $variables['view']->result[0]->nid == $variables['nid']) {
      //  $variables['content']['field_ding_news_list_image'][0]['#image_style'] = 'ding_panorama_list_large_wide'; 
      //}
      //
      //// If there is no list image, then render an empty div
      //if(empty($variables['field_ding_news_list_image'])) {
      //  $variables['no_image'] = '<div class="field-name-field-ding-news-list-image image-styling-16-9"></div>';
      //} else {
      //  $variables['no_image'] = "";
      //}
      
    break;
  } 
}

/**
 * Ding event
 */
function preprocess__node__ding_event(&$variables) {
  $date = field_get_items('node', $variables['node'], 'field_ding_event_date');
  
  switch ($variables['view_mode']) {
    case 'teaser':
      // Add class if image
      if (!empty($variables['field_ding_event_list_image'])) {
        $variables['classes_array'][] = 'has-image';
      }
      // Create image url
      $uri = $variables['field_ding_event_list_image'][0]['uri'];
      if (!empty($uri)) {
        $variables['event_background_image'] = image_style_url('ding_panorama_list_large', $uri);
      }
      // Date
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
    case 'full':
     if (!empty($date)) {
      array_push($variables['classes_array'], 'node-full');
      $start_date = strtotime($date[0]['value']);
      $end_date = strtotime($date[0]['value2']);

      $variables['time_begin'] = format_date($start_date, 'ding_time_only');
      $variables['time_end'] = format_date($end_date, 'ding_time_only');
      
      //Make social-share button
      $share = '
        <div class="social-share-container">
          <div class="inner">
            <div class="label">' . t('Share this event') . '</div>
            <div class="share-buttons">
              <a href="#" class="fb-share">Facebook</a>
              <a href="#" class="twitter-share">Twitter</a>
              <a href="#" class="mail-share">E-mail</a>
            </div>
          </div>
        </div>
      ';
      $variables['share_button'] = $share;
      
       //Make book/participate in event button, @TODO to be integrated with place2book
       $price = $variables['field_ding_event_price']['und'][0]['value'];  
       $participate = t('Participate in the event');
       $book = t('Book a ticket');
       
       if ($price == null || $price == "0") {
         $text = $participate;
       } else {
         $text = $book;
       }
       
       
       $variables['book_button'] = '<a href="#" class="ticket button">' . $text . '</a>';
       
    }
    break;
  }
}

/**
 * Ding Library
 */
function preprocess__node__ding_library(&$variables) {
  switch ($variables['view_mode']) {
    case 'teaser':
      //dpm($variables);
    break;
  }
}

/**
 * Ding Group
 */
function preprocess__node__ding_group(&$variables) {
  switch ($variables['view_mode']) {
    case 'teaser':
      $img_uri = $variables['field_ding_group_list_image'][0]['uri'];
      if (!empty($img_uri)) {
        $variables['background_image'] = image_style_url('ding_panorama_list_large_desaturate', $img_uri);
      }
    break;
    case 'full':
      array_push($variables['classes_array'], 'node-full');
    break;
  }
}
