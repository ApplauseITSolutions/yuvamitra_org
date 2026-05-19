<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
 
require '../vendor/autoload.php';
 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
 
// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);
 
$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$subject = $data['subject'] ?? 'Website Inquiry';
$message = $data['message'] ?? '';
 
if (!$name || !$email || !$message) {
    echo json_encode(["status" => "error", "message" => "Required fields missing"]);
    exit;
}
 
$mail = new PHPMailer(true);
 
try {
    // SMTP config
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'applauseitdev@gmail.com';
    $mail->Password   = 'okyc smgd vhdk vyah';  
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
 
    // Sender & Receiver
    $mail->setFrom('applauseitdev@gmail.com', 'Yuva Mitra ');
    $mail->addAddress('teliharshal40@gmail.com');
    $mail->addReplyTo($email, $name);
 
    // Embed Logo
    $logoPath = '../src/assets/logos/yuva-Mitra-footer-logo.png';
    $hasLogo = false;
    if (file_exists($logoPath)) {
        $mail->addEmbeddedImage($logoPath, 'footer_logo');
        $hasLogo = true;
    }
 
    // Content
    $mail->isHTML(true);
    $mail->Subject = "New Website Enquiry: $subject";
   
    // Compact & Elegant Email Template
    $mail->Body = "
        <div style='font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);'>
            <!-- Header -->
            <div style='background-color: #1f2f5f; padding: 20px; text-align: center;'>
                " . ($hasLogo ? "<img src='cid:footer_logo' alt='Yuva Mitra' style='height: 45px; width: auto;'>" : "<h2 style='color: #ffffff; margin: 0;'>YUVA MITRA</h2>") . "
            </div>
           
            <!-- Body -->
            <div style='padding: 25px; background-color: #ffffff;'>
                <p style='color: #666; font-size: 14px; margin-top: 0;'>Hello, you have received a new inquiry:</p>
               
                <table style='width: 100%; border-collapse: collapse; margin-bottom: 20px;'>
                    <tr>
                        <td style='padding: 8px 0; color: #888; font-size: 13px; width: 90px;'><strong>Name:</strong></td>
                        <td style='padding: 8px 0; color: #333; font-size: 15px;'>$name</td>
                    </tr>
                    <tr>
                        <td style='padding: 8px 0; color: #888; font-size: 13px;'><strong>Email:</strong></td>
                        <td style='padding: 8px 0; font-size: 15px;'><a href='mailto:$email' style='color: #EF1C25; text-decoration: none;'>$email</a></td>
                    </tr>
                    <tr>
                        <td style='padding: 8px 0; color: #888; font-size: 13px;'><strong>Subject:</strong></td>
                        <td style='padding: 8px 0; color: #333; font-size: 15px;'>$subject</td>
                    </tr>
                </table>
 
                <div style='background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 3px solid #EF1C25;'>
                    <p style='margin: 0 0 5px; color: #888; font-size: 12px; text-transform: uppercase;'>Message</p>
                    <p style='margin: 0; color: #444; font-size: 15px; line-height: 1.5;'>$message</p>
                </div>
            </div>
 
            <!-- Footer -->
            <div style='background-color: #f4f4f4; padding: 12px; text-align: center; font-size: 11px; color: #999;'>
                This is an automated message from the Yuva Mitra Website.
            </div>
        </div>
    ";
 
    $mail->AltBody = "New Website Enquiry from $name ($email):\n\nSubject: $subject\n\nMessage:\n$message";
 
    $mail->send();
 
    echo json_encode(["status" => "success", "message" => "Enquiry sent successfully"]);
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to send email. Error: {$mail->ErrorInfo}"
    ]);
}
?>
 