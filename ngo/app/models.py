from django.db import models

class Program(models.Model):
    title = models.CharField(max_length=255)
    donation_goal = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='programs/')

    def __str__(self):
        return self.title

class Volunteer(models.Model):
    AVAILABILITY_CHOICES = [
        ('Weekdays', 'Weekdays'),
        ('Weekends', 'Weekends'),
        ('Evenings', 'Evenings'),
        ('Full Time', 'Full Time'),
    ]

    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField()
    skills = models.TextField(blank=True)
    availability = models.CharField(max_length=20, choices=AVAILABILITY_CHOICES)
    status = models.CharField(max_length=10, choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')], default='Pending')

    def __str__(self):
        return f"{self.full_name} ({self.status})"
    
class Member(models.Model):
    MEMBERSHIP_CHOICES = [
        ('regular', 'Regular (3 months)'),
        ('gold', 'Gold (6 months)'),
        ('platinum', 'Platinum (12 months)'),
    ]

    full_name = models.CharField(max_length=100)
    place_of_birth = models.CharField(max_length=100)
    birth_date = models.DateField()
    full_address = models.TextField()
    nationality = models.CharField(max_length=100)
    city_country = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    membership_type = models.CharField(max_length=10, choices=MEMBERSHIP_CHOICES)

    def __str__(self):
        return self.full_name
    
class Donation(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    amount = models.PositiveIntegerField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.amount} BDT"
    

class GalleryImage(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='gallery/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
