<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PieceResource extends JsonResource
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
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'author' => $this->author,
            'selectedEventIds' => $this->selected_event_ids,
            // 'events' => EventResource::collection($this->whenLoaded('events'))
        ];
    }
    
}
