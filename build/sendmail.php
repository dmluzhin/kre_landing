<?php
$to = ['sales@kre.ru','voronkov@kre.ru','assistcity@kre.ru']; // Основной email

if (isset($_POST['email'])) array_push($to, $_POST['email']);
$subject = isset($_POST['subject']) ? $_POST['subject'] : 'Запрос с лендинга Баркли-Парк';
if (isset($_POST['name'])) $message = '<p>Имя: ' . $_POST['name'] . '</p>';
if (isset($_POST['phone'])) $message .= '<p>Телефон: ' . $_POST['phone'] . '</p>';
if (isset($_POST['time'])) $message .= '<p>Время звонка: ' . $_POST['time'] . '</p>';
if (isset($_POST['address'])) $message .= '<p>Адрес объекта: ' . $_POST['address'] . '</p>';

if (isset($message)) {

    $from = "info@kre.ru";
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
    $headers .= 'From: ' . $from . "\r\n";

    foreach($to as $email) mail($email, $subject, $message, $headers);
}
?>

