# website/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('volunteer/', views.volunteer_view, name='volunteer'),
    path('our-mission/', views.mission_view, name='our-mission'),
    path('our-objective/', views.objective_view, name='our-objective'),
    path('education/', views.education_view, name='education'),
    path('health/', views.health_view, name='health'),
    path('women-empowerment/', views.womenEmpowerment_view, name='women-empowerment'),
    path('vocational-training/', views.vocational_view, name='vocational-training'),
    path('loan-program/', views.loan_view, name='loan-program'),
    path('membership/', views.membership_view, name='membership'),
    path('membership/thanks/', views.membership_thanks_view, name='membership_thanks'),
    path('donate/', views.donation_view, name='donate'),
    path('donate/submit/', views.donation_submit, name='donation_submit'),
    path('donate/thank-you/', views.donation_thank_you, name='donation_thank_you'),
]
