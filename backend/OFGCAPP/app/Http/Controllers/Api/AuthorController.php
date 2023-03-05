<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AuthorResource;
use App\Http\Controllers\Api\BaseController as BaseController;
use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File; 
use Validator;
use Illuminate\Foundation\Http\FormRequest;

class AuthorController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $temp = $request->all();
        if(isset($temp['include']) && $temp['include']=='pieces'){
            return AuthorResource::collection(Author::with('pieces')->get());
        } else{
            return AuthorResource::collection(Author::all());
        }
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
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Error validation', $validator->errors());
        }
        if($request->input('method')=='POST'){
            $author = Author::create([
                'name' => $request->name,
                'image' => $image_aux,
                'description' => $request->description,
            ]);
        }
        if($request->input('method')=='PUT'){
            $author = Author::find($request->input('id'));
            if($request->image != "undefined"){
                // $image_name = "storage/".$author->image;
                // if(File::exists($image_name)) {
                //     File::delete($image_name);
                // }
                $author->update([
                    'name' => $request->name,
                    'image' => isset($image_aux) ? $image_aux : $author->image,
                    'description' => $request->description,
                ]);
            } else{
                $author->update([
                    'name' => $request->name,
                    'description' => $request->description
                ]);

            }
        }
        

        return response()->json([
            'message' => "Author saved successfully!",
            'author' => $author
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Author  $author
     * @return \Illuminate\Http\Response
     */
    public function show(Author $author, Request $request)
    {   
        if($request->input("include") && $request->input("include")=='pieces'){
            $author = Author::with(['pieces'])->where('id', $author['id'])->first();
            return new AuthorResource($author);
        } else{
            return new AuthorResource($author);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Author  $author
     * @return \Illuminate\Http\Response
     */
    public function edit(Author $author)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Author  $author
     * @return \Illuminate\Http\Response
     */
    public function update(Author $author, Request $request )
    {   
        // $validator = Validator::make($request->all(), [
        //     'name' => 'required',
        //     'description' => 'required',
        // ]);

        // if ($validator->fails()) {
        //     return $this->sendError('Error validation', $validator->errors());
        // }
        if($request->input('image')){
            $image_name = "storage/".$author->image;
            if(File::exists($image_name)) {
                File::delete($image_name);
            }
            $image_path = $request->file('image')->store('image', 'public');
            $author->update([
                'name' => $request->name,
                'image' => $image_path,
                'description' => $request->description,
            ]);
        } else{

            // error_log('Some message here pablo.');
            // var_dump("chacho tu");
            // error_log(print_r($request->all()));
            $algote = $request->getContent();
            $author->update($request->all());
        }
        
        
        return response()->json([
            'message' => 'dwidw',
            'author' => $author,
            'alguillo' => $algote,
            'hh' => $request->all(),
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Author  $author
     * @return \Illuminate\Http\Response
     */
    public function destroy(Author $author)
    {
        $author->delete();
        $image_name = "storage/".$author->image;
        if(File::exists($image_name)) {
            File::delete($image_name);
        }
        return response()->json([
            'message' => "Author deleted successfully!",
        ], 200);
    }
}
