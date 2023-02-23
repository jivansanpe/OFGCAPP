<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;
use App\Models\Event;

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

    public function test_can_get_list_of_events()
    {
        $response = $this->get('/api/events');
        $response->assertStatus(200);
    }

    public function test_can_get_list_of_events_with_pieces()
    {
        $response = $this->get('/api/events?include=pieces');
        $response->assertStatus(200);
    }

    public function test_can_create_event()
    {
        $data = [
            'name' => 'Test Event',
            'description' => 'Test description',
            'date' => '2023-02-25',
            'category' => 'Test category'
        ];

        $response = $this->post('/api/events', $data);
        $response->assertStatus(200);
    }

    public function test_can_update_event()
    {
        $event = Event::create([
            'name' => 'Test Event',
            'description' => 'Test description',
            'date' => '2023-02-23',
            'category' => 'Test category'
        ]);

        $data = [
            'name' => 'Updated Event Name',
            'description' => 'Updated Event Description',
            'date' => '2023-02-25',
            'category' => 'Updated Event Category'
        ];

        $response = $this->put('/api/events/' . $event->id, $data);
        $response->assertStatus(200);
    }

    public function test_can_delete_event()
    {
        $event = Event::create([
            'name' => 'Test Event',
            'description' => 'Test description',
            'date' => '2023-02-25',
            'category' => 'Test category'
        ]);

        $response = $this->delete('/api/events/' . $event->id);
        $response->assertStatus(200);
    }
}
