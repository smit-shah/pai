<?php
    require_once 'config.php';
    
    if ($_REQUEST['user_id'] == '') {
        echo json_encode(array('status' => 'fail', 'message' => 'User id can not be blank!', 'data' => array()));
        die();
    }

    $tasks = get_posts(array(
            //'posts_per_page' => 5,
            'author' => $_REQUEST['user_id'],
            'post_status' => 'publish'
        ), ARRAY_A);

    if(count($tasks) < 1) {
        echo json_encode(array('status' => 'fail', 'message' => 'No tasks found!', 'data' => array()));
        die();
    }

    $ret = array();

    foreach ($tasks as $key => $task) {
        $meta = get_post_meta($task->ID);
        $thumb_id = get_post_thumbnail_id( $task->ID );
        $thumb_url = wp_get_attachment_image_src($thumb_id,'thumbnail', true);
        $ret[] = array(
            'id' => $task->ID,
            'title' => $task->post_title,
            'description' => $task->post_content,
            'time' => $meta['time'][0],
            'date' => $meta['date'][0],
            'address' => $meta['address'][0],
            'price' => $meta['price'][0],
            'emergency' => $meta['emergency'][0],
            'emergency_price' => $meta['emergency_price'][0],
            'display_name' => $meta['display_name'][0],
            'image' => $thumb_url[0]
        );
    }

    echo json_encode(array('status' => 'success', 'message' => 'Task found!', 'data' => $ret));
    die();
?>