<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\User;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use WithoutMiddleware;
    protected static $registerData = [];
    protected static $invalidRegisterData = [];
    public function testInvalidRegister()
    {
        self::$invalidRegisterData = [
            'name' => $randomString = bin2hex(random_bytes(5)),
            'email' => $randomString,
            'password' => 'password',
            'confirm_password' => 'password',
        ];
        $response = $this->json('POST', '/api/register', self::$registerData);

        // Assert that the login was not successful
        $response->assertStatus(404)->assertJson([
            'success' => false
        ]);
    }
    public function testRegister()
    {
        self::$registerData = [
            'name' => $randomString = bin2hex(random_bytes(5)),
            'email' => $randomString . '@example.com',
            'password' => 'password',
            'confirm_password' => 'password',
        ];

        $response = $this->json('POST', '/api/register', self::$registerData);

        $response->assertStatus(200)->assertJson([
            'message' => 'User created successfully.'
        ]);
    }
    public function testLogin()
    {
        $loginData = [
            'email' => self::$registerData['email'],
            'password' => self::$registerData['password'],
        ];
        $response = $this->json('POST', '/api/login', $loginData);

        // Assert that the login was successful
        $response->assertStatus(200)->assertJson([
            'message' => 'User signed in'
        ]);
    }

    public function testInvalidLogin()
    {
        $loginData = [
            'email' => self::$registerData['email'],
            'password' => 'incorrect_password',
        ];
        $response = $this->json('POST', '/api/login', $loginData);

        // Assert that the login was not successful
        $response->assertStatus(404)->assertJson([
            'message' => 'Unauthorised.'
        ]);
    }
    
    
}
