<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\BaseController as BaseController;
use App\Models\Noti;
use App\Models\Musician;
use App\Http\Resources\NotiResource;
use App\Http\Resources\MusicianResource;
use App\Http\Controllers\Api\MusicianController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Validator;

class NotiController extends BaseController
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return NotiResource::collection(Noti::all());
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'mensaje' => 'required',
        ]);
    
        if ($validator->fails()) {
            return $this->sendError('Error validation', $validator->errors());
        }
    
        $noti = Noti::create([
            'title' => $request->input('title'),
            'mensaje' => $request->input('mensaje'),
        ]);
    
        return response()->json([
            'message' => "Noti saved successfully!",
            'noti' => $noti
        ], 200);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Noti  $noti
     * @return \Illuminate\Http\Response
     */
    public function show(Noti $noti, Request $request)
    {
        return new NotiResource($noti);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Noti  $noti
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Noti $noti)
    {

        $noti->update([
            'title' => $request->title,
            'mensaje' => $request->mensaje,
        ]);


        return response()->json([
            'message' => "Noti updated successfully!",
            'request' => $request->input()
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Noti  $noti
     * @return \Illuminate\Http\Response
     */
    public function destroy(Noti $noti)
    {
        $noti->delete();

        return response()->json([
            'message' => "Noti
             deleted successfully!",
        ], 200);
    }
}
