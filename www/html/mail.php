<?php
$lname = $_POST['lname'];
$fname = $_POST['fname'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$bussName = $_POST['business-name'];
$message = $_POST['message'];

$to = "onezerogurus@gmail.com";
$subject = "$bussName Website Quote";
$message = "Name: $fname $lname\n\n
			Email: $email -- Phone: $phone \n\n
			Bussiness Name: $bussName \n\n
			Message: $message \n\n";
$from = "$email";
$headers = "From:" . $email;
mail($to,$subject,$message,$headers);
?>

<html>
	<head>
	</head>
	<body>
		<div>
			<h1>Email Has Been Sent</h1>
		</div>

		<a href="../index.html"><button> Back</button></a>
	</body>
</html>