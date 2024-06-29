<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->user),
            'landlord' => new UserResource($this->landlord),
            'message' => $this->message,
            'type' => $this->type,
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
