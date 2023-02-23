<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;
use App\Models\Musician;

class MusicianTest extends TestCase
{
    use WithoutMiddleware;
    protected static $testData = [];
    protected static $modelData = [];
    //protected static $musicians = ['{"id":"1","category":"Solist","special":"No"}'];
    public function testPost()
    {
        self::$testData = [
            'name' => "awawwa",
            'description' => "a description"
            //'musicians' => self::$musicians,
        ];
        self::$modelData = new Musician(self::$testData);

        $response = $this->json('POST', '/api/musicians', self::$testData);

        $response->assertStatus(200)->assertJson([
            'message' => "Musician saved successfully!"
        ]);
    }

    public function test_can_get_list_of_musicians()
    {
        $response = $this->get('/api/musicians');
        $response->assertStatus(200);
    }

    public function test_can_get_list_of_musicians_with_pieces()
    {
        $response = $this->get('/api/musicians?include=pieces');
        $response->assertStatus(200);
    }

    public function test_can_create_musician()
    {
        $data = [
            'name' => 'Test Musician',
            'description' => 'Test description'
        ];

        $response = $this->post('/api/musicians', $data);
        $response->assertStatus(200);
    }

    public function test_can_update_musician()
    {
        $musician = Musician::create([
            'name' => 'Test Musician',
            'description' => 'Test description'
        ]);

        $data = [
            'name' => 'Updated Musician Name',
            'description' => 'Updated Musician Description'
        ];

        $response = $this->put('/api/musicians/' . $musician->id, $data);
        $response->assertStatus(200);
    }

    public function test_can_delete_musician()
    {
        $musician = Musician::create([
            'name' => 'Test Musician',
            'description' => 'Test description'
        ]);

        $response = $this->delete('/api/musicians/' . $musician->id);
        $response->assertStatus(200);
    }
}
