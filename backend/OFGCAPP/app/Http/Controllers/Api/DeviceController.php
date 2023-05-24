<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Device;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;


class DeviceController extends Controller
{
    public function registerDevice(Request $request)
    {
        $response = new \stdClass;
        $response->code = "OK";
        $response->message = "";
        $response->id = 0;

        try {
            // Verificación de campos
            if ($request->has('TOKEN')) {
                $token = $request->input('TOKEN');

                if ($token == NULL) {
                    $response->code = "ERR";
                    $response->message = "Token Nulo";
                    $response->id = 0;
                } else {
                    $id = null;
                    if ($request->has('ID')) {
                        $id = $request->input('ID');
                    }

                    // Registro en la base de datos del token y el estado
                    $mysqli = DB::connection()->getPdo();

                    if ($id != null) {
                        $stmt = $mysqli->prepare("UPDATE devices SET token = ? WHERE id = ?");
                        $stmt->bindParam(1, $token);
                        $stmt->bindParam(2, $id);
                        $resultado1 = $stmt->execute();
                        $stmt->close();
                    } else {
                        $resultado1 = DB::table('devices')->insertGetId(['token' => $token]);
                        $response->id = $resultado1;
                    }
                }
            } else {
                $response->code = "ERR";
                $response->message = "Faltan campos";
                $response->id = 0;
            }
        } catch (\Exception $e1) {
            $response->code = "ERR";
            $response->message = "Error";
            $response->id = 0;
        }

        return response()->json($response);
    }
}
