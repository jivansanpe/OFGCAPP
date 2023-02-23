<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_be_created()
    {
        $data = [
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'password' => 'password'
        ];

        $user = User::create($data);

        $this->assertDatabaseHas('users', $data);
        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals($data['name'], $user->name);
        $this->assertEquals($data['email'], $user->email);
    }

    /** @test */
    public function a_user_can_be_updated()
    {
        $user = User::create([
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'password' => 'password'
        ]);

        $data = [
            'name' => 'Jane Doe',
            'email' => 'janedoe@example.com',
            'password' => 'newpassword'
        ];

        $user->update($data);

        $this->assertDatabaseHas('users', $data);
        $this->assertEquals($data['name'], $user->name);
        $this->assertEquals($data['email'], $user->email);
    }

    /** @test */
    public function a_user_can_be_deleted()
    {
        $user = User::create([
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'password' => 'password'
        ]);

        $user->delete();

        $this->assertDatabaseMissing('users', [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ]);
    }
}
