<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Contact;
use App\Http\Requests\ContactRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\View\View OR \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        if (request()->ajax()) {
            $contacts = \Auth::User()->contacts->take(10);
            return response()->json(['contacts' => $contacts]);
        }
        return view('app');
    }

    /* Store */
    public function store(ContactRequest $request): JsonResponse
    {
        \Auth::user()->contacts()->create($request->validated());
//        return response()->json(['validated' => $request->validated()], 201);

        return response()->json(['message' => 'created'], 201);
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
