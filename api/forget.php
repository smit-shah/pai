<?php
    require_once 'config.php';
    $userdata = get_user_by('email', $_REQUEST['email']);
    if (!empty($userdata)) {
        $user           =   $userdata->data;
        $user_email     =   $user->user_email;
        $new_password   =   get_user_meta($userdata->ID, "user_password", true);
        
        /*$headers        =   'MIME-Version: 1.0' . "\r\n";
        $headers        .=  'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers        .=  'From: noreply@pairi.com' . "\r\n";
        $headers        .=  'Reply-To: noreply@pairi.com' . "\r\n";
        $message = '<html>
                    <head>
                      <title>Recover Your Password</title>
                    </head>
                    <body>
                      <table>
                        <tr>
                          <td><br />Hello,<br /><br /> Your password for login is  <b>' . $new_password . '</b></td>
                        </tr>
                      </table>
                    </body>
                    </html>';
        mail($user_email, "Forget Password", $message, $headers);*/
        $status     =   'success';
        $message    =   "Password sent successfully";
    } else {
        $status     =   'fail';
        $message    =   "Email id does not exists.";
    }
    $result_return  =   array('data' => '','status'=>$status,'message'=>$message);
    echo json_encode($result_return);
    die();
?>