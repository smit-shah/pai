<?php
    require_once 'config.php';
    require_once '../wp-admin/includes/ms.php';

    global $wpdb;

    $name = $_REQUEST['name'];
    $first_name = $name != '' ? explode(" ", $name)[0] : '';
    $last_name = $name != '' ? explode(" ", $name)[1] : '';
    $email = sanitize_text_field($_REQUEST['email']);
    $device_id = sanitize_text_field($_REQUEST['device_id']);
    $password = "loginwithFB";
    $platform = sanitize_text_field($_REQUEST['platform']);
    $gender = sanitize_text_field($_REQUEST['gender']);
    $age = sanitize_text_field($_REQUEST['age']);
    $profile_image = $_REQUEST['profile_img'];
    $invalid_usernames = array('admin');
    
    if (!is_email($email)) {
        echo json_encode(array('data' => array(), 'status'=>'fail', 'message'=> 'E-mail address is invalid.'));
        die();
    }

    $user = get_user_by_email($email);
    
    if($user && !$user->data->user_status) {
        echo json_encode(array('data' => "", 'status'=>'fail','message'=>'Your account has been blocked, please contact admin.'));
        die();
    }
    else if(!empty($user)) {
        if (email_exists($email)) {
            $username = $user->data->user_login;
            $user = get_user_by('login', $username);
            $userdata = $user->data;
            $result_array['user_id'] = $userdata->ID;
            $result_array['first_name'] = $first_name;
            $result_array['last_name'] = $last_name;
            $result_array['user_email'] = $userdata->user_email;
            
            $profile_image = (!empty($profile_image) && $profile_image != '') ? $_REQUEST['profile_img'] : get_user_meta($userdata->ID, "profile_img", true);
            $result_array['profile_image'] = $profile_image;
            
            update_user_meta($userdata->ID, 'first_name', $first_name);
            update_user_meta($userdata->ID, 'last_name', $last_name);
            update_user_meta($userdata->ID, 'device_id', $_REQUEST['device_id']);
            update_user_meta($userdata->ID, 'platform', $_REQUEST['platform']);
            update_user_meta($userdata->ID, 'lat', $_REQUEST['lat']);
            update_user_meta($userdata->ID, 'lng', $_REQUEST['lng']);
            update_user_meta($userdata->ID, 'profile_img', $profile_image);

            $result_return                  =   array('data' => $result_array,'status'=>'success','message'=> 'User successfully logged in.');
            echo json_encode($result_return);
            die();
        }
    }
    else {
        //If email id is new, proceed with creating the user with that email id
        $user = array(
            'user_login'    =>  $email,
            'user_pass'     =>  $password,
            'user_email'    =>  $email,
        );
        $user_id        =   wp_insert_user($user);
                
        if ($user_id->errors) {
            $message    =   'Some problem with login with facebook';
            $status     =   "fail";
        } else {
            /*$headers        =   'MIME-Version: 1.0' . "\r\n";
            $headers        .=  'Content-type: text/html; charset=iso-8859-1' . "\r\n";
            $headers        .=  'From: noreply@pairi.com' . "\r\n";
            $headers        .=  'Reply-To: noreply@pairi.com' . "\r\n";
            $message = '<html>
                        <head>
                          <title>Welcome to Pairi</title>
                        </head>
                        <body>
                          <table>
                            <tr>
                              <td>Hi '.$user_name.',<br /><br /> We welcome you to Pairi</td>
                            </tr>
                          </table>
                        </body>
                        </html>';
            mail($email, "Welcome to Pairi", $message, $headers);*/
            $user                               =   get_user_by_email($email);
            if ($user) {
                $username                       =   $user->data->user_login;
            }
            $user                               =   get_user_by('login', $username);
            $userdata                           =   $user->data;
            update_user_status( $userdata->ID, 'user_status', 1 );
            $result_array['user_id']            =   $userdata->ID;
            $result_array['first_name']          =   get_user_meta($userdata->ID,'first_name',true);
            $result_array['user_email']         =   $userdata->user_email;
            $result_array['fbid']               =   $_REQUEST['fbid'];
            $result_array['profile_image']      =   $profile_image;
            $status                             =   'success';
            $message                            =   'User successfully logged in.';
            
            update_user_meta($user_id, 'fbid', $_REQUEST['fbid']);
            update_user_meta($user_id, 'device_id', $_REQUEST['device_id']);
            update_user_meta($user_id, 'platform', $_REQUEST['platform']);
            update_user_meta($user_id, 'first_name', $first_name);
            update_user_meta($user_id, 'last_name', $last_name);
            update_user_meta($user_id, 'gender', $gender);
            update_user_meta($user_id, 'age', $age);
            update_user_meta($user_id, 'status', 1);
            update_user_meta($userdata->ID, 'lat', $_REQUEST['lat']);
            update_user_meta($userdata->ID, 'lon', $_REQUEST['lon']);

        }
        $result_return                  =   array('data' => $result_array,'status'=>$status,'message'=>$message);
        echo json_encode($result_return);
        die();
    }

?>