<?php
/**
 * @TODO Is this file necessary
 * @file
 * Defines the page header for the theme.
 */
?>

<?php if ($logo): ?>
  <div class="logo">
    <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home">
      <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
    </a>
  </div>
<?php endif; ?>
