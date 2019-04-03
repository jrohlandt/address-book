<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Contact;
use App\Http\Requests\ContactRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (request()->ajax()) {
            $contacts = \Auth::User()->contacts->take(10);
            return response()->json(['contacts' => $contacts]);
        }
        return view('app');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /* Store */
    public function store(ContactRequest $request): JsonResponse
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $contactId
     * @return \Illuminate\Http\Response
     */
    public function show($contactId)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $contactId
     * @return \Illuminate\Http\Response
     */
    public function edit($contactId)
    {
        //
    }

    /* Update */
    public function update(ContactRequest $request, int $contactId): JsonResponse
    {
        //
    }

    /* Destroy */
    public function destroy(int $contactId): JsonResponse
    {
        //
    }
}
