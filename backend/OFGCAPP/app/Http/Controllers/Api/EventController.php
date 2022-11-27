<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Musician;
use App\Http\Resources\EventResource;
use App\Http\Resources\MusicianResource;
use App\Http\Controllers\Api\MusicianController;
use Illuminate\Http\Request;

class EventController extends Controller
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
    public function store(Request $request)
    {
        $musData = $request->input('musicians');
        if(!$musData){
            $event = Event::create($request->all());
        }  
        $event = Event::find($request->input('event'));
        $category = '';
        $special = '';
        $musician;
        if($musData){
            foreach($musData as $valor){
                $category = $valor['category'];
                $special = $valor['special'];
                $musician = $valor['id'];
                $prueba = Musician::find($musician);
                $event->musicians()->save(Musician::find($musician), array('category' => $category,'special' => $special));
            }
        } 
        return response()->json([
            'message' => "Event saved successfully!",
            'event' => 'a'
        ], 200);
    }

    // public function addMusician(Request $request, Event $event, Musician $musician, )
    // {
    //     $category = '';
    //     $special = '';
    //     if($request->category){
    //         $category = $request->category;
    //     }
    //     if($request->special){
    //         $special = $request->special;
    //     }
    //     if($event->musicians()->save($musician, array('category' => $category,'special' => $special ))){
    //         return response()->json(['message'=>'Musician added','data'=>$musician],200);
    //     }
    //     return response()->json(['message'=>'Error','data'=>null],400);
    // }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show(Event $event)
    {
        return new EventResource($event);
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
    public function update(Request $request, Event $event, Musician $musician)
    {
        $category = '';
        $special = '';
        
        $temp = $request->all();
        $event->update($request->all());
        
        if(isset($temp['musicians'])){
            foreach($request as $valor){
                $category = $valor[1];
                $special = $valor[2];
                $event->musicians()->save($valor[0], array('category' => $category,'special' => $special));
            }
        } 
        return response()->json([
            'message' => "Event updated successfully!",
            'request' => $request->headers,
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

        return response()->json([
            'message' => "Event
             deleted successfully!",
        ], 200);
    }
}
