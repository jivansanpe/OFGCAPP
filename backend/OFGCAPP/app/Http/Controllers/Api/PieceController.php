<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PieceResource;
use App\Models\Piece;
use App\Models\Author;
use App\Models\Event;
use Illuminate\Http\Request;

class PieceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PieceResource::collection(Piece::all());
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
        $piece = Piece::create($request->all());

        // $event = Event::find($request->event_id);
        // $event->pieces()->save($piece);

        // $author = Author::find($request->author_id);
        // $author->pieces()->save($piece);

        return response()->json([
            'message' => "Piece saved successfully!",
            'piece' => $piece
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Piece  $piece
     * @return \Illuminate\Http\Response
     */
    public function show(Piece $piece)
    {
        return new PieceResource($piece);
    }
    public function byEvent(Event $event)
    {
        return $event->pieces;
    }
    public function byAuthor(Author $author)
    {
        return $author->pieces;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Piece  $piece
     * @return \Illuminate\Http\Response
     */
    public function edit(Piece $piece)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Piece  $piece
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Piece $piece)
    {
        $piece->update($request->all());

        return response()->json([
            'message' => "Piece updated successfully!",
            'piece' => $piece
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Piece  $piece
     * @return \Illuminate\Http\Response
     */
    public function destroy(Piece $piece)
    {
        $piece->delete();

        return response()->json([
            'message' => "Piece deleted successfully!",
        ], 200);
    }
}
