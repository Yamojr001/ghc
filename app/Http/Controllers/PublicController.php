<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\ContactMessage;
use App\Models\Distribution;
use App\Models\Donation;
use App\Models\Expense;
use App\Models\FAQ;
use App\Models\GalleryItem;
use App\Models\ImpactReport;
use App\Models\Partner;
use App\Models\Program;
use App\Models\Subscriber;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\Volunteer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function home()
    {
        $stats = [
            'beneficiaries' => Distribution::sum('beneficiary_count'),
            'locations' => Distribution::distinct('state')->count(),
            'distributions' => Distribution::count(),
            'donors' => Donation::distinct('donor_email')->count(),
        ];

        return Inertia::render('Public/Home', [
            'stats' => $stats,
            'programs' => Program::where('is_active', true)->orderBy('display_order')->take(6)->get(),
            'testimonials' => Testimonial::where('is_active', true)->take(3)->get(),
            'recentDistributions' => Distribution::where('status', 'approved')->latest('distribution_date')->take(5)->get(),
        ]);
    }

    public function about()
    {
        return Inertia::render('Public/About', [
            'teamMembers' => TeamMember::where('is_active', true)->orderBy('display_order')->get(),
        ]);
    }

    public function transparency()
    {
        return Inertia::render('Public/Transparency', [
            'donations' => Donation::where('status', 'verified')->latest()->take(20)->get(),
            'expenses' => Expense::where('status', 'approved')->latest()->take(20)->get(),
            'distributions' => Distribution::where('status', 'approved')->latest('distribution_date')->take(20)->get(),
            'impactReports' => ImpactReport::where('is_published', true)->latest()->get(),
        ]);
    }

    public function programs()
    {
        return Inertia::render('Public/Programs', [
            'programs' => Program::where('is_active', true)->orderBy('display_order')->get(),
        ]);
    }

    public function donors()
    {
        $donations = Donation::where('status', 'verified')->latest()->take(20)->get();
        $topDonors = Donation::where('status', 'verified')
            ->where('is_anonymous', false)
            ->selectRaw('donor_name, donor_country, SUM(amount_usd) as total')
            ->groupBy('donor_name', 'donor_country')
            ->orderByDesc('total')
            ->take(10)
            ->get();

        return Inertia::render('Public/Donors', [
            'donors' => $donations,
            'topDonors' => $topDonors,
            'donationStats' => [
                'gold' => Donation::where('status', 'verified')->where('amount_usd', '>=', 1000)->count(),
                'silver' => Donation::where('status', 'verified')->whereBetween('amount_usd', [500, 999])->count(),
                'bronze' => Donation::where('status', 'verified')->whereBetween('amount_usd', [100, 499])->count(),
            ],
        ]);
    }

    public function media()
    {
        return Inertia::render('Public/Media', [
            'galleryItems' => GalleryItem::where('is_active', true)->latest()->get(),
            'distributions' => Distribution::where('status', 'approved')
                ->whereNotNull('photo_urls')
                ->latest('distribution_date')
                ->get(),
        ]);
    }

    public function blog()
    {
        return Inertia::render('Public/Blog', [
            'posts' => BlogPost::where('is_published', true)->latest('published_at')->get(),
        ]);
    }

    public function contact()
    {
        return Inertia::render('Public/Contact', [
            'faqs' => FAQ::where('is_active', true)->orderBy('display_order')->get(),
        ]);
    }

    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        ContactMessage::create($validated);

        return back()->with('success', 'Thank you for your message. We will get back to you soon.');
    }

    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:subscribers,email',
        ]);

        Subscriber::create($validated);

        return back()->with('success', 'Thank you for subscribing!');
    }
}
