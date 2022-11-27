<?php

namespace App\Http\Resources;

use App\Http\Resources\PieceResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;
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
        // $uri = $request->path();
        // if ($request-> is('*pieces*'))
        // {
        //     return [
        //         'name' => $this->name,
        //         'description' => $this->description,
        //         'date' => $this->date,
        //         'category' => $this->category,
        //         'pieces'=>$this->pieces,
        //     ];
        // } else{
            return [
                'name' => $this->name,
                'description' => $this->description,
                'date' => $this->date,
                'category' => $this->category,
                'pieces'=> PieceResource::collection($this->whenLoaded('pieces')), //$this->pieces,
            ];
        // }
        
    }
}
