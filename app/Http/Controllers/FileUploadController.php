<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadController extends Controller
{
    /**
     * Handle the file upload via XHR.
     */
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:10240', // 10MB max
        ]);

        $file = $request->file('file');
        $originalName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $fileName = Str::slug(pathinfo($originalName, PATHINFO_FILENAME)) . '-' . time() . '.' . $extension;
        
        // This assumes you have run 'php artisan storage:link'
        $path = $file->storeAs('uploads', $fileName, 'public');
        
        return response()->json([
            'file_url' => Storage::url($path),
            'file_path' => $path,
            'original_name' => $originalName,
            'file_size' => $file->getSize(),
        ]);
    }
}