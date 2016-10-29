<?php
    require_once 'config.php';

    if (!isset($_REQUEST['user_id']) || $_REQUEST['user_id'] == '') {
        echo json_encode(array('status' => 'fail', 'message' => 'User id can not be blank!', 'data' => array()));
        die();
    }

    if (!isset($_REQUEST['task_id']) || $_REQUEST['task_id'] == '') {
        echo json_encode(array('status' => 'fail', 'message' => 'Task can not be blank!', 'data' => array()));
        die();
    }

    add_post_meta($_REQUEST['task_id'], "task_status", 'Assigned');
    add_post_meta($_REQUEST['task_id'], "working_user", $_REQUEST['user_id']);
    echo json_encode(array('status' => 'success', 'message' => 'Task accepted', 'data' => array()));
    die();
?>