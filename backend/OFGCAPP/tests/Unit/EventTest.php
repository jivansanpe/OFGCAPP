<?php

namespace Tests\Unit;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\User;
use Tests\TestCase;
use App\Models\Event;
use App\Models\Musician;
use App\Http\Resources\EventResource;
use App\Http\Resources\MusicianResource;
use App\Http\Controllers\Api\MusicianController;
use Illuminate\Http\Request;
class EventTest extends TestCase
{
    use WithoutMiddleware;
    protected static $testData = [];
    protected static $modelData = [];
    //protected static $musicians = ['{"id":"1","category":"Solist","special":"No"}'];
    public function testPost()
    {
        self::$testData = [
            'name' => "awawwa",
            'description' => "a description",
            'date' => "2023/06/07",
            'category' => "de temporada",
            //'musicians' => self::$musicians,
        ];
        self::$modelData = new Event(self::$testData);

        $response = $this->json('POST', '/api/events', self::$testData);

        $response->assertStatus(200)->assertJson([
            'message' => "Event saved successfully!"
        ]);
    }
}

