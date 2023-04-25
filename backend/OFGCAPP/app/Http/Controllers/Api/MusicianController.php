<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\EventController;
use App\Http\Resources\MusicianResource;
use App\Http\Controllers\Api\BaseController as BaseController;
use App\Models\Musician;
use Illuminate\Support\Facades\File; 
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
        if($request->image != "undefined"){
            $image_aux = $request->file('image')->store('image', 'public');
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'nullable',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Error validation', $validator->errors());
        }
        if($request->input('method')=='POST'){
            $musician = Musician::create([
                'name' => $request->name,
                'image' => $image_aux,
                'description' => $request->description,
            ]);
        }
        if($request->input('method')=='PUT'){
            $musician = Musician::find($request->input('id'));
            if($request->image != "undefined"){
                // $image_name = "storage/".$author->image;
                // if(File::exists($image_name)) {
                //     File::delete($image_name);
                // }
                $musician->update([
                    'name' => $request->name,
                    'image' => isset($image_aux) ? $image_aux : $musician->image,
                    'description' => $request->description,
                ]);
            } else{
                $musician->update([
                    'name' => $request->name,
                    'description' => $request->description
                ]);

            }
        }

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
            'image' => 'image|mimes:jpg,png,jpeg,gif,svg|max:2048',
            'description' => 'nullable',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Error validation', $validator->errors());
        }
        if($request->input('image')){
            $image_name = "storage/".$musician->image;
            if(File::exists($image_name)) {
                File::delete($image_name);
            }
            $image_path = $request->file('image')->store('image', 'public');
            $musician->update([
                'name' => $request->name,
                'image' => $image_path,
                'description' => $request->description,
            ]);
        } else{
            $musician->update($request->all());
        }
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
        $image_name = "storage/".$musician->image;
        if(File::exists($image_name)) {
            File::delete($image_name);
        }
        return response()->json([
            'message' => "Musician deleted successfully!",
        ], 200);
    }
}
