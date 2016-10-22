<?php
    require_once 'config.php';
    global $wpdb;

    $first_name  = sanitize_text_field($_REQUEST['first_name']);
    $last_name = sanitize_text_field($_REQUEST['last_name']);
    $email = sanitize_text_field($_REQUEST['email']);
    $device_id = sanitize_text_field($_REQUEST['device_id']);
    $password = sanitize_text_field($_REQUEST['password']);
    $platform = sanitize_text_field($_REQUEST['platform']);
    $gender = sanitize_text_field($_REQUEST['gender']);
    $age = sanitize_text_field($_REQUEST['age']);
    $referal = sanitize_text_field($_REQUEST['referal']);
    $invalid_usernames = array('admin');
    $code = substr($first_name, 0, 3) . substr(time(), -4);
    
    if (!validate_username($first_name) || in_array($first_name, $invalid_usernames)) {
    	echo json_encode(array('status' => 'fail', 'message' => 'First name is invalid.'));
    	die();
    } else if (!is_email($email)) {
    	echo json_encode(array('status' => 'fail', 'message' => 'E-mail address is invalid.'));
    	die();
    } else if (email_exists($email)) {
    	echo json_encode(array('status' => 'fail', 'message' => 'E-mail address is already in use.'));
    	die();
    } else {
        //Everything has been validated, proceed with creating the user , Create the user
        $user = array(
            'user_login'    =>  $email,
            'user_pass'     =>  $password,
            'user_email'    =>  $email,
        );
        $user_id            =   wp_insert_user($user);
        if ($user_id->errors) {
            echo json_encode(array('status' => 'fail', 'message' => 'Could not create new user.'));
    		die();
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
	                          <td><br /> Hi '.$user_name.',<br /><br /> We welcome you to Pairi</td>
	                        </tr>
	                      </table>
	                    </body>
	                    </html>';
        	mail($email, "Welcome to Pairi", $message, $headers);*/
            $user_info                      =   get_userdata($user_id);
            $user_info                      =   $user_info->data;
            $result_array['user_id']        =   $user_id;
            $result_array['user_email']     =   $user_info->user_email;
            if (isset($_FILES['profile_img']) && $_FILES['profile_img'] != '') {
                $imagedata          =   $_FILES['profile_img'];
                $iname              =   $imagedata['name'];
                $exm                =   explode(".", $iname);
                $image_name         =   $exm[0] . "-" . uniqid() . "." . $exm[1];
                $tmp_name           =   $imagedata['tmp_name'];
                $upload_dir         =   wp_upload_dir();
                $imagepath          =   $upload_dir['path'] . '/';
                $httpimagepath      =   $upload_dir['url'] . '/';
                move_uploaded_file($tmp_name, $imagepath . $image_name);
                add_user_meta($user_id, 'profile_img', $httpimagepath . $image_name);
                $result_array['profile_image'] = $httpimagepath . $image_name;
            }
            else {
                $result_array['profile_image'] = "";
            }

            add_user_meta($user_id, 'device_id', $device_id);
            add_user_meta($user_id, 'platform', $platform);
            add_user_meta($user_id, 'first_name', $first_name);
            add_user_meta($user_id, 'last_name', $last_name);
            add_user_meta($user_id, 'user_password', $password);
            add_user_meta($user_id, 'gender', $gender);
            add_user_meta($user_id, 'age', $age);
            add_user_meta($user_id, 'status', 1);
            add_user_meta($user_id, 'lat', $_REQUEST['lat']);
            add_user_meta($user_id, 'lon', $_REQUEST['lon']);
            add_user_meta($user_id, 'code', $code);

            if ($referal != '') {
                $existing_code = $wpdb->get_row('SELECT * FROM `' . _get_meta_table('user') . '` WHERE `meta_key` LIKE "code" AND `meta_value` LIKE "'.$referal.'" ', ARRAY_A);
                if (count($existing_code) > 0) {
                    $result_array['invalid_code'] = 0;
                    add_user_meta($user_id, 'referal_user_id', $existing_code['user_id']);
                    add_user_meta($user_id, 'used_referal', 1);
                }
                else {
                    $result_array['invalid_code'] = 1;
                }
            }
            
            $message = 'New user created successfully';
            $result_return =  array('data' => $result_array,'status'=>'success','message'=>$message);
    		echo json_encode($result_return);
    		die();
        }
    }
?>