<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email_addresses',
        'phone_numbers',
    ];

    protected $casts = [
        'email_addresses' => 'array',
        'phone_numbers' => 'array',
    ];
}
