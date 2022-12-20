<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\EventController;
use App\Http\Resources\MusicianResource;
use App\Http\Controllers\Api\BaseController as BaseController;
use App\Models\Musician;
use Illuminate\Http\Request;
use Validator;
class MusicianController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MusicianResource::collection(Musician::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Error validation', $validator->errors());
        }
        $musician = Musician::create($request->all());

        return response()->json([
            'message' => "Musician saved successfully!",
            'musician' => $musician
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Musician  $musician
     * @return \Illuminate\Http\Response
     */
    public function show(Musician $musician)
    {
        return new MusicianResource($musician);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Musician  $musician
     * @return \Illuminate\Http\Response
     */
    public function edit(Musician $musician)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Musician  $musician
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Musician $musician)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Error validation', $validator->errors());
        }
        $musician->update($request->all());

        return response()->json([
            'message' => "Event updated successfully!",
            'Musician' => $musician
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Musician  $musician
     * @return \Illuminate\Http\Response
     */
    public function destroy(Musician $musician)
    {
        $musician->delete();

        return response()->json([
            'message' => "Musician deleted successfully!",
        ], 200);
    }
}
