<article class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <div class="inner">
    <div class="info-top">
      <div class="type"><?php print t('Event'); ?></div>
      <div class="info-dash">-</div>
      <?php print render($content['field_ding_event_category']); ?>
    </div>
    <div class="date"><?php print $event_date; ?></div>
    <h3 class="title"><?php print $title; ?></h3>
    <?php print render($content['field_ding_event_lead']); ?>
    <div class="event-bottom">
      <div class="info-bottom">
        <div class="library"><?php print render($content['og_group_ref']); ?></div>
        <div class="date-time"><?php print $event_time; ?></div>
      </div>
      <a href="<?php print $node_url; ?>" class="button"><?php print t('Read more'); ?></a>
    </div>
  </div>
</article>