<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class NotificationController extends Controller
{
    public function sendNotification(Request $request)
    {
        $response = new \stdClass();
        $response->code = "OK";
        $response->message = "Enviado correctamente";

        try {
            // Verificación de campos
            $id = $request->input('ID');
            $title = $request->input('title');
            $message = $request->input('message');

            if ($id == null || $title == null || $message == null) {
                $response->code = "ERR";
                $response->message = "Faltan parámetros";
            } else {
                $registatoin_ids = DB::table('devices')
                    ->where('ID', $id)
                    ->pluck('TOKEN')
                    ->toArray();

                $notification = [
                    "title" => $title,
                    "body" => $message
                ];

                $fields = [
                    'registration_ids' => $registatoin_ids,
                    'notification' => $notification,
                    'direct_book_ok' => true
                ];

                $url = 'https://fcm.googleapis.com/fcm/send';
                $headers = [
                    "authorization: key=" .FCM_APIKEY,
                    "content-type: application/json"
                ];

                // Open curl connection
                $ch = curl_init();
                // Set the url, number of POST vars, POST data
                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
                $result = curl_exec($ch);
                if ($result === FALSE) {
                    // die('Curl failed: ' . curl_error($ch));
                }
                curl_close($ch);
            }
        } catch (\Exception $e) {
            $response->code = "ERR";
            $response->message = "Error";
        }

        return response()->json($response);
    }
}
