<?php

namespace App\Http\Resources;
use App\Http\Resources\PieceResource;
use App\Http\Resources\MusicianResource;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {   
        return [
            'id'=> $this->id,
            'name' => $this->name,
            'image' => $this->image,
            'description' => $this->description,
            'date' => $this->date,
            'category' => $this->category,
            'pieces'=> PieceResource::collection($this->whenLoaded('pieces')),
            'musician'=> $this->musician,
            'link' => $this->link,
            'status' => $this->status
            // 'musicians'=> MusicianResource::collection($this->whenLoaded('musicians')),
            // 'musicians' => $this->musicians,
            
        ];
    }
}
