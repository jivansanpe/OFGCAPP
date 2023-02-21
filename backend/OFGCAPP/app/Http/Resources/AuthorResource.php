<?php

namespace App\Http\Resources;
use App\Http\Resources\PieceResource;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthorResource extends JsonResource
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
            'description' => $this->description,
            'image' => $this->image,
            'pieces'=> PieceResource::collection($this->whenLoaded('pieces')),
        ];
    }
}
