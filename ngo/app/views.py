from django.shortcuts import render, redirect
from .models import Program, Donation, GalleryImage
from django.contrib import messages
from .forms import VolunteerForm, MemberForm
from django.contrib.auth.decorators import login_required


def home(request):
    programs = Program.objects.all()
    gallery_images = GalleryImage.objects.all()
    return render(request, 'index.html', {
        'programs': programs,
        'gallery_images': gallery_images
    })


@login_required(login_url='account_login')  # Redirect to allauth login
def volunteer_view(request):
    if request.method == 'POST':
        form = VolunteerForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Thank you for volunteering! We’ll get in touch soon.')
            return redirect('volunteer')
    else:
        form = VolunteerForm()
    return render(request, 'volunteer_form.html', {'form': form})


def education_view(request):
    return render(request, 'education.html')


def health_view(request):
    return render(request, 'health.html')


def womenEmpowerment_view(request):
    return render(request, 'women_empowerment.html')


def vocational_view(request):
    return render(request, 'vocational.html')


def loan_view(request):
    return render(request, 'loan_program.html')


def mission_view(request):
    return render(request, 'mission.html')


def objective_view(request):
    return render(request, 'objective.html')


def donation_view(request):
    return render(request, 'donation.html')


@login_required(login_url='account_login')  # Redirect to allauth login
def membership_view(request):
    if request.method == 'POST':
        form = MemberForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('membership_thanks')
    else:
        form = MemberForm()
    return render(request, 'membership_form.html', {'form': form})


def membership_thanks_view(request):
    return render(request, 'membership_thanks.html')


def donation_submit(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        phone = request.POST.get('phone')
        email = request.POST.get('email')
        amount = request.POST.get('amount')

        Donation.objects.create(
            name=name,
            phone=phone,
            email=email,
            amount=amount
        )

        return redirect('donation_thank_you')
    return redirect('donate')


def donation_thank_you(request):
    return render(request, 'donation_thank_you.html')
