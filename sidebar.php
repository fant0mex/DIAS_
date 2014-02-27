<aside id="sidebar">
<?php
if( is_single() )
  dynamic_sidebar('sidebar_single_blog');
else
  dynamic_sidebar('sidebar_blog');
?>
</aside>