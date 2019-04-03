<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',

            'email_addresses.*.type'            => 'string|max:16',
            'email_addresses.*.email_address'   => 'email',

            'phone_numbers.*.type'              => 'string|max:16',
            'phone_numbers.*.phone_number'      => 'string|max:20',
        ];
    }
}
