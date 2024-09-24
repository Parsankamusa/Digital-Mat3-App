
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import Profile,Sacco, Matatu, Route, Street, UserProfile

# Register the Profile model with the admin site
admin.site.register(Profile)
admin.site.register(Sacco)
admin.site.register(Matatu)
admin.site.register(Street)
admin.site.register(Route)
admin.site.register(UserProfile)

# Customize the User model's admin
class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'

# Unregister the original User admin
admin.site.unregister(User)

# Register the User model with the custom admin
admin.site.register(User, UserAdmin)
