# website/admin.py
from django.contrib import admin
from .models import Program
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from .models import Volunteer
from django.core.mail import send_mail
from django.conf import settings
from .models import Member
from .models import GalleryImage


admin.site.register(Program)
admin.site.unregister(User)  # Unregister default User admin
admin.site.register(User, UserAdmin)  # Register again to customize if needed
admin.site.register(Member)

'''@admin.register(Volunteer)
class VolunteerAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'availability', 'status')
    list_filter = ('status', 'availability')
    actions = ['approve_volunteers', 'reject_volunteers']

    def approve_volunteers(self, request, queryset):
        queryset.update(status='Approved')
    approve_volunteers.short_description = "Approve selected volunteers"

    def reject_volunteers(self, request, queryset):
        queryset.update(status='Rejected')
    reject_volunteers.short_description = "Reject selected volunteers"'''


@admin.register(Volunteer)
class VolunteerAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'availability', 'status')
    list_filter = ('status', 'availability')
    actions = ['approve_volunteers', 'reject_volunteers']  # ✅ restore these

    def approve_volunteers(self, request, queryset):
        for volunteer in queryset:
            if volunteer.status != 'Approved':
                volunteer.status = 'Approved'
                volunteer.save()
                # Send email
                send_mail(
                    subject="Welcome to Our NGO!",
                    message=f"Dear {volunteer.full_name},\n\nThank you for volunteering with us. We're excited to have you on board!",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[volunteer.email],
                    fail_silently=False,
                )
    approve_volunteers.short_description = "Approve selected volunteers"

    def reject_volunteers(self, request, queryset):
        queryset.update(status='Rejected')
    reject_volunteers.short_description = "Reject selected volunteers"

    def save_model(self, request, obj, form, change):
        if change:
            try:
                old_obj = Volunteer.objects.get(pk=obj.pk)
            except Volunteer.DoesNotExist:
                old_obj = None

            if old_obj and old_obj.status != 'Approved' and form.cleaned_data['status'] == 'Approved':
                send_mail(
                    subject="Welcome to Our NGO!",
                    message=f"Dear {obj.full_name},\n\nThank you for volunteering with us. We're excited to have you on board!",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[obj.email],
                    fail_silently=False,
                )

        super().save_model(request, obj, form, change)

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('title', 'uploaded_at')