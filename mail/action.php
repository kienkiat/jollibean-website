<?php
// ini_set("display_errors", "1");
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require "vendor/autoload.php";

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

$first_name = $_POST["name"]; // required
$email_from = $_POST["email"]; // required
$subject = $_POST["subject"]; // required
$comments = $_POST["message"]; // required
if (isset($_POST['g-recaptcha-response'])) {
    $recaptcha=$_POST['g-recaptcha-response'];
}

if (!$recaptcha) {
    ?>
<script>
    alert('We are sorry, but there appears to be a problem with the form you submitted.');
    document.location = '../contact.html';
</script>
<?php
    exit();
}

$secretKey = "6LdSvCMaAAAAAMgYX95DwWSEMPWXmC9GlTrRikP6";
$ip = $_SERVER["REMOTE_ADDR"];
// post request to server
$url =
"https://www.google.com/recaptcha/api/siteverify?secret=" .
urlencode($secretKey) .
"&response=" .
urlencode($recaptcha);
$response = file_get_contents($url);
$responseKeys = json_decode($response, true);

// should return JSON with success as true
if ($responseKeys["success"]) {
    try {
        //Server settings
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER; //Enable verbose debug output
        $mail->isSMTP(); //Send using SMTP
        $mail->Host = "smtp.gmail.com"; //Set the SMTP server to send through
        $mail->SMTPAuth = true; //Enable SMTP authentication
        $mail->Username = "jollibeancomsg@gmail.com"; //SMTP username
        $mail->Password = "olzcnavtfgkolnxi"; //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; //Enable implicit TLS encryption
        $mail->Port = 465; //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        $mail->SMTPOptions = [
          "ssl" => [
            "verify_peer" => false,
            "verify_peer_name" => false,
            "allow_self_signed" => true,
          ],
        ];              
        
        //Recipients
        $mail->setFrom($email_from, $first_name);
        $mail->addAddress('customers@jollibean.com.sg');
        // $mail->addAddress("zai@eglonet.com");
        
        //Content
        $mail->isHTML(true); //Set email format to HTML
        $mail->Subject = "Contact Form";
        $mail->Body =
        "<p>Name: " .
        $first_name .
        "</p><p>Email: " .
        $email_from .
        "</p><p>Subject: " .
        $subject .
        "</p><p>Comments: " .
        $comments .
        "</p>";
        
        $mail->send();
        // echo "Message has been sent successfully";
        ?>
<script>
    alert('Thank you for contacting us. We will be in touch with you very soon.');
    document.location = '../contact.html';
</script>
<?php
    } catch (Exception $e) {
        // echo "Mailer Error: " . $mail->ErrorInfo;
        ?>
<script>
    alert('We are sorry, but there appears to be a problem with the form you submitted.');
    document.location = '../contact.html';
</script>
<?php
    }
} else {
    // echo "Mailer Error: " . $mail->ErrorInfo;
    ?>
<script>
    alert('Please do not spam. Thank you!');
    document.location = 'contact-us.php';
</script>
<?php
}
