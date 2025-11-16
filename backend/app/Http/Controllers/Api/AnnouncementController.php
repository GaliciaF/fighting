<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnnouncementController extends Controller
{
    // List all announcements
    public function index()
    {
        $announcements = Announcement::with('user')->orderBy('posted_at', 'desc')->get();

        return response()->json([
            'announcements' => $announcements
        ]);
    }

    // Store a new announcement
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $announcement = Announcement::create([
            'title' => $request->title,
            'content' => $request->content,
            'posted_by' => Auth::id(), // admin/staff id
            'posted_at' => now(),
        ]);

        return response()->json([
            'message' => 'Announcement created successfully',
            'announcement' => $announcement
        ], 201);
    }

    // Show a single announcement
    public function show($id)
    {
        $announcement = Announcement::with('user')->findOrFail($id);

        return response()->json([
            'announcement' => $announcement
        ]);
    }

    // Update an announcement
    public function update(Request $request, $id)
    {
        $announcement = Announcement::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
        ]);

        $announcement->update($request->only(['title', 'content']));

        return response()->json([
            'message' => 'Announcement updated successfully',
            'announcement' => $announcement
        ]);
    }

    // Delete an announcement
    public function destroy($id)
    {
        $announcement = Announcement::findOrFail($id);
        $announcement->delete();

        return response()->json([
            'message' => 'Announcement deleted successfully'
        ]);
    }
}
