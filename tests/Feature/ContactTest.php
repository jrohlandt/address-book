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

    private $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = factory(User::class)->create();
    }

    /** @test */
    public function can_store_contact()
    {
//        $this->withoutExceptionHandling();
        $data = [
            'first_name' => 'john',
            'last_name' => 'smith',
            'email_addresses' => [
                ['type' => 'home', 'email_address' => 'smith.family@example.com'],
                ['type' => 'work', 'email_address' => 'jsmith@example.com'],
            ],
            'phone_numbers' => [
                ['type' => 'home', 'phone_number' => '+27 21 555 5555'],
                ['type' => 'mobile', 'phone_number' => '+27 82 555 5555'],
            ],
        ];

        $response = $this->actingAs($this->user)->json('post', '/contacts', $data);

//        dd($response->decodeResponseJson());
        $response->assertStatus(201);
        $contacts = Contact::where('user_id', $this->user->id)->get();
        $this->assertCount(1, $contacts);

        $c = $contacts->first();
//        dd($contacts);
        $this->assertEquals('john', $c->first_name);
        $this->assertEquals('jsmith@example.com', $c->email_addresses[1]['email_address']);
        $this->assertEquals('+27 21 555 5555', $c->phone_numbers[0]['phone_number']);
        $this->assertEquals('home', $c->phone_numbers[0]['type']);

    }

    /** @test */
    public function contact_with_invalid_email_address_will_not_be_stored()
    {
        $data = [
            'first_name' => 'john',
            'last_name' => 'smith',
            'email_addresses' => [
                ['type' => 'home', 'email_address' => 'smith.family@example.com'],
                ['type' => 'work', 'email_address' => 'invalid(at)example.com'],
            ]
        ];

        $response = $this->actingAs($this->user)->json('post', '/contacts', $data);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('email_addresses.1.email_address');
        $contacts = Contact::where('user_id', $this->user->id)->get();
        $this->assertCount(0, $contacts);
    }

    /** @test */
    public function can_fetch_contacts()
    {
        factory(Contact::class, 10)->create([
            'user_id' => $this->user->id,
        ]);

        $response = $this->actingAs($this->user)->json('get', '/contacts', [], ['X-Requested-With' => 'XMLHttpRequest']);

        $response
            ->assertStatus(200)
            ->assertJsonCount(10, 'contacts');

//        dd($response->decodeResponseJson()['contacts']);
    }
}
