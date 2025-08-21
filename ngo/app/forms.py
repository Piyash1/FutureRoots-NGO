from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Volunteer
from .models import Member

class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']


class VolunteerForm(forms.ModelForm):
    class Meta:
        model = Volunteer
        fields = ['full_name', 'email', 'phone', 'address', 'skills', 'availability']


class MemberForm(forms.ModelForm):
    class Meta:
        model = Member
        fields = '__all__'
        widgets = {
            'birth_date': forms.DateInput(attrs={'type': 'date'}),
            'gender': forms.TextInput(attrs={'placeholder': '(Male/Female)'}),
        }