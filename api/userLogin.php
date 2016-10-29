<?php
    require_once 'config.php';

    global $wpdb;
    $result_array =  array();
    $time = current_time('mysql');
    $user = get_user_by_email($_REQUEST['email']);

    if ($user) {
        $username = $user->data->user_login;
    }

    $user = get_user_by('login', $username);
    
    if ($user == null) {
        $status  =   'fail';
        $message =   "Username or Password is incorrect";
    }
    else if(!$user->data->user_status) {
        $status = "fail";
        $message = "Your account has been blocked, please contact admin.";
    }
    else if(!empty($user)) {
        if ($user && wp_check_password($_REQUEST['password'], $user->data->user_pass, $user->ID)) {
            $userdata = $user->data;
            $result_array['user_id'] = $userdata->ID;
            $result_array['first_name'] = get_user_meta($userdata->ID,'first_name',true);
            $result_array['last_name'] = get_user_meta($userdata->ID,'last_name',true);
            $result_array['email'] =   $userdata->user_email;
            $profile = get_user_meta($userdata->ID, "profile_img", true);
            $result_array['profile_image'] = $profile;
            update_user_meta($userdata->ID, 'device_id', $_REQUEST['device_id']);
            update_user_meta($userdata->ID, 'platform', $_REQUEST['platform']);
            update_user_meta($userdata->ID, 'lat', $_REQUEST['lat']);
            update_user_meta($userdata->ID, 'lon', $_REQUEST['lon']);
            
            $status = "success";
            $message = 'User successfully logged in';
        }
        else {
            $status = 'fail';
            $message = "Username or Password is incorrect";
        }
    }
    echo json_encode(array('data' => $result_array,'status'=>$status,'message'=>$message));
    die();
?>