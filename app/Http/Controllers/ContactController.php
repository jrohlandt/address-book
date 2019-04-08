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
            if (!empty(request('search'))) {
                $search = request('search');
                $contacts = \Auth::User()->contacts()
                    ->where('first_name', 'like' , "%{$search}%")
                    ->orWhere('last_name', 'like' , "%{$search}%")
                    ->orderBy('first_name', 'asc')
                    ->limit(20)
                    ->get();
            }
            else {
                $contacts = \Auth::User()->contacts()->orderBy('first_name', 'asc')->limit(20)->get();
            }
            return response()->json(['contacts' => $contacts]);
        }
        return view('app');
    }

    /* Store */
    public function store(ContactRequest $request): JsonResponse
    {
        \Auth::user()->contacts()->create($request->validated());
        return response()->json(['message' => 'created'], 201);
    }

    /**
     * Fetch a single contact.
     *
     * @param  int  $contactId
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $contactId): JsonResponse
    {
        $contact = \Auth::user()->contacts()->findOrFail($contactId);
        return response()->json(['message' => 'success', 'contact' => $contact]);
    }

    /* Update */
    public function update(ContactRequest $request, int $contactId): JsonResponse
    {
        $contact = \Auth::user()->contacts()->findOrFail($contactId);
        $contact->update($request->validated());
        return response()->json(['message' => 'updated']);
    }

    /* Destroy */
    public function destroy(int $contactId): JsonResponse
    {
        $contact = \Auth::user()->contacts()->findOrFail($contactId);
        $contact->delete();
        return response()->json(['message' => 'deleted']);
    }
}
