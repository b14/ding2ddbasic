<article class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <a href="<?php print $node_url; ?>">
    <?php print render($content['field_ding_news_list_image']); ?>
    <div class="news-text">
      <h3 class="title"><?php print $title; ?></h3>
      <div class="category-and-submitted">
        <?php print render($content['field_ding_news_category']); ?>
        <div class="info-dash">-</div>
        <div class="submitted"><?php print $submitted ?></div>
      </div>
      <?php print render($content['field_ding_news_lead']); ?>
    </div>
  </a>
</article>