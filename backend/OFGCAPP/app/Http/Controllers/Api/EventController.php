<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\BaseController as BaseController;
use App\Models\Event;
use App\Models\Musician;
use App\Http\Resources\EventResource;
use App\Http\Resources\MusicianResource;
use App\Http\Controllers\Api\MusicianController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File; 
use Validator;
class EventController extends BaseController
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
            return EventResource::collection(Event::with('pieces')->get());
        } else{
            return EventResource::collection(Event::all());
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
    public function assignMusicians(Event $event, $musData)
    {
         if($musData){
             foreach($musData as $valor){
                 $event->musicians()->save(Musician::find($valor['id']), array('category' => $valor['category'],'special' => $valor['special']));
             }
         }      
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
            'description' => 'required',
            'date' => 'required|date',
            'category' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Error validation', $validator->errors());
        }
        $image_path = $request->file('image')->store('image', 'public');
        $event = Event::create([
            'name' => $request->name,
            'image' => $image_path,
            'description' => $request->description,
            'date' => $request->date,
            'category' => $request->category,
        ]);
        if($request->input('musicians')){
            $this->assignMusicians($event,$request->input('musicians'));
        } 

        return response()->json([
            'message' => "Event saved successfully!"
        ], 200);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show(Event $event,Request $request)
    {
        if($request->input("include") && $request->input("include")=='pieces'){
            $event = Event::with(['pieces'])->where('id', $event['id'])->first();
            return new EventResource($event);
        } else{
            return new EventResource($event);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Event $event)
    {

        if($request->input('image')){
            $image_name = "storage/".$event->image;
            if(File::exists($image_name)) {
                File::delete($image_name);
            }
            $image_path = $request->file('image')->store('image', 'public');
            $event->update([
                'name' => $request->name,
                'image' => $image_path,
                'description' => $request->description,
                'date' => $request->date,
                'category' => $request->category,
            ]);
        } else{
            $event->update($request->all());
        }
        if($request->input('musicians')){
            $this->assignMusicians($event, $request->input('musicians'));
        } 
        return response()->json([ 
            'message' => "Event updated successfully!",
            'request' => $request->input()
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event)
    {
        $event->delete();
        $image_name = "storage/".$author->image;
        if(File::exists($image_name)) {
            File::delete($image_name);
        }
        return response()->json([
            'message' => "Event
             deleted successfully!",
        ], 200);
    }
}
