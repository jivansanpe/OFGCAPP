<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\BaseController as BaseController;
use App\Http\Resources\PieceResource;
use App\Models\Piece;
use App\Models\Author;
use App\Models\Event;
use Illuminate\Http\Request;
use Validator;
class PieceController extends BaseController
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
        $validator = Validator::make($request->all(), [
            'event_id' => 'required',
            'author_id' => 'required',
            'name' => 'required',
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Error validation', $validator->errors());
        }
        $piece = Piece::create($request->all());

        return response()->json([
            'message' => "Piece saved successfully!",
            'piece' => $request->all()
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
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Error validation', $validator->errors());
        }
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
