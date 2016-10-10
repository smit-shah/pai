<?php
    require_once 'config.php';
    
    $task = get_post($_REQUEST['task_id']);
    $meta = get_post_meta($_REQUEST['task_id']);
    $thumb_id = get_post_thumbnail_id( $task->ID );
    $thumb_url = wp_get_attachment_image_src($thumb_id,'thumbnail', true);
    
    //pr($task);
    //pr($meta);

    $ret = array(
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

    echo json_encode(array('status' => 'success', 'data' => $ret));
    die();
?>