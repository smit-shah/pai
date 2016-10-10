<?php
    require_once 'config.php';

    $upload_dir         =   wp_upload_dir();
    $imagepath          =   $upload_dir['path'] . '/';
    $httpimagepath      =   $upload_dir['url'] . '/';

    $postData = array(
      'post_title'    => $_REQUEST['title'],
      'post_content'  => $_REQUEST['description'],
      'post_status'   => 'publish',
      'post_author'   => $_REQUEST['user_id'],
      'post_type'     => 'post',
      'post_status'   => 'publish'
    );
    $lastInsertId   =   wp_insert_post($postData);

    if ($lastInsertId) {
        if ($_FILES['image']) {
            $imagedata          =   $_FILES['image'];
            if($error[$key] == 0) {
                $iname              =   $imagedata['name'];
                $tmp_name           =   $imagedata['tmp_name'];
                $error              =   $imagedata['error'];
                $wp_filetype  =   wp_check_filetype($iname, null );
                
                $dbimgpath          =   $httpimagepath.$iname;
                move_uploaded_file($tmp_name, $imagepath . $iname);

                $attachment = array(
                        'post_mime_type'    => $wp_filetype['type'],
                        'post_title'        => sanitize_file_name($iname),
                        'post_content'      => '',
                        'post_status'       => 'inherit'
                    );
                $attach_id      =   wp_insert_attachment($attachment, $imagepath . $iname,$lastInsertId);
                require_once(ABSPATH.'wp-admin/includes/image.php');
                $attach_data = wp_generate_attachment_metadata($attach_id, $imagepath . $iname);
                wp_update_attachment_metadata($attach_id, $attach_data);
                set_post_thumbnail($lastInsertId,$attach_id);
            }
        }
        add_post_meta($lastInsertId, "time", $_REQUEST['time']);
        add_post_meta($lastInsertId, "date", $_REQUEST['date']);
        add_post_meta($lastInsertId, "address", $_REQUEST['address']);
        add_post_meta($lastInsertId, "price", $_REQUEST['price']);
        add_post_meta($lastInsertId, "emergency", $_REQUEST['emergency']);
        add_post_meta($lastInsertId, "emergency_price", $_REQUEST['emergency_price']);
        add_post_meta($lastInsertId, "display_name", $_REQUEST['display_name']);

        $result_return  =   array('data' => '','status'=>'success','message'=>"Task created successfully");
        echo json_encode($result_return);
        die();
    }
?>