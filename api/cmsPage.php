<?php
    require_once 'config.php';
    $page       =   get_post($_REQUEST['page_id']); 
    $status     =   'success';
    $message    =   "CMS content.";
    $result_array = (!empty($page->post_content)) ? $page->post_content : '';
    $result_return = array('data' => $result_array,'status'=>$status,'message'=>$message);
    echo json_encode($result_return);
    die();
?>