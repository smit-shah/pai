<?php
    require_once 'config.php';
    
    if ($_REQUEST['user_id'] == '') {
        echo json_encode(array('status' => 'fail', 'message' => 'User id can not be blank!', 'data' => array()));
        die();
    }

    if ($_REQUEST['lat'] == '') {
        echo json_encode(array('status' => 'fail', 'message' => 'Latitude can not be blank!', 'data' => array()));
        die();
    }

    if ($_REQUEST['lon'] == '') {
        echo json_encode(array('status' => 'fail', 'message' => 'Longitude can not be blank!', 'data' => array()));
        die();
    }

    $lat = $_REQUEST['lat'];
    $lon = $_REQUEST['lon'];

    $tasks = get_posts(array( 'post_status' => 'publish' ), ARRAY_A);

    if(count($tasks) < 1) {
        echo json_encode(array('status' => 'fail', 'message' => 'No tasks found!', 'data' => array()));
        die();
    }

    $ret = array();

    foreach ($tasks as $key => $task) {
        $meta = get_post_meta($task->ID);
        $thumb_id = get_post_thumbnail_id( $task->ID );
        $thumb_url = wp_get_attachment_image_src($thumb_id,'thumbnail', true);
        $author_meta = get_user_meta($task->post_author);
        $ret[] = array(
            'id' => $task->ID,
            'title' => $task->post_title,
            //'description' => $task->post_content,
            //'time' => $meta['time'][0],
            //'date' => $meta['date'][0],
            //'address' => $meta['address'][0],
            'price' => $meta['price'][0],
            //'emergency' => $meta['emergency'][0],
            //'emergency_price' => $meta['emergency_price'][0],
            'display_name' => $meta['display_name'][0],
            'profile_image' => $author_meta['profile_image'] ? $author_meta['profile_image'][0] : '',
            'gender' => $author_meta['gender'] ? $author_meta['gender'][0] : '',
            'age' => $author_meta['age'] ? $author_meta['age'][0] : '',
            //'image' => $thumb_url[0],
            'distance' => (float)distance($lat, $lon, $meta['lat'][0], $meta['lon'][0], "M")
        );
    }

    usort($ret, function($a, $b) {
        return $b['distance'] * 100 < $a['distance'] * 100 ? 1 : -1;
    });

    echo json_encode(array('status' => 'success', 'message' => 'Task found!', 'data' => $ret));
    die();
?>