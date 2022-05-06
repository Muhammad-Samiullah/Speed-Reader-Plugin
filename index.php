<?php
/*
Plugin Name: Speed Reader
Description: This plugin will add a speed-reader widget to your website. You can specify the target paragraph by applying the class "speed-reader" and the paragraph will be replaced by the speed reader widget on front-end.
Author: Muhammad Bilal ( bilal.scientist@gmail.com )
Version: 1.0.0
*/

// add_shortcode('speed_reader_plugin', 'Speed_Reader_Plugin');
add_filter('the_content', 'MBK_Speed_Reader_Plugin');
function MBK_Speed_Reader_Plugin($content) {
    $content .= file_get_contents (plugin_dir_path( __FILE__ ) . "page.txt");
    return $content;
}


add_action('wp_enqueue_scripts', 'pwwp_enqueue_bootstrap4');
function pwwp_enqueue_bootstrap4() {
    wp_enqueue_style( 'bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css' );
    wp_enqueue_script( 'popper','//cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js', array( 'jquery' ),'',true );
    wp_enqueue_style('main-styles', plugins_url( 'css/style.css' , __FILE__ ), array(), rand(), false);
	wp_register_style('fontawesome', "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css", array());
    wp_enqueue_style('fontawesome');
}

function speed_reader_scripts() {
    wp_enqueue_script( 'frontend-ajax', plugins_url( 'js/demo.js?x=' . rand(), __FILE__ ), array('jquery'), null, true );
    wp_localize_script( 'frontend-ajax', 'frontend_ajax_object',
        array( 'ajaxurl' => admin_url( 'admin-ajax.php' ))
    	);
	wp_enqueue_script('bootstrap-js', 'https://code.jquery.com/jquery-3.2.1.slim.min.js');
	wp_enqueue_script('bootstrap-js2', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js');
	wp_enqueue_script('bootstrap-js3', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js');
	wp_enqueue_script('jquery1', 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js');
}
add_action( 'wp_enqueue_scripts', 'speed_reader_scripts' );



?>