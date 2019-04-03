<?php

namespace Tests\Feature;

use App\Contact;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ContactTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function can_fetch_contacts()
    {
        $this->withoutExceptionHandling();
        $user = factory(User::class)->create();
        $contacts = factory(Contact::class, 10)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->json('get', '/contacts', [], ['X-Requested-With' => 'XMLHttpRequest']);

        $response
            ->assertStatus(200)
            ->assertJsonCount(10, 'contacts');

//        dd($response->decodeResponseJson()['contacts']);
    }
}
