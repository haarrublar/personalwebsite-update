from django.contrib import admin
from .models import (AcademicParticipation, AuthorInfo, Degree, ExpertiseCategory, Post, ExpertiseTool, WorkExperience, Project, Publication, AuthorPhotos)


class AuthorPhotoInline(admin.TabularInline):
    model = AuthorPhotos
    extra = 3  # Shows 3 empty upload slots by default
    
@admin.register(AuthorInfo)
class AuthorInfoAdmin(admin.ModelAdmin):
    ordering = ['id']
    inlines = [AuthorPhotoInline]
    list_display = ['id','author_name','author_email']

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['id','title','created','publish']
    
@admin.register(Degree)
class DegreeAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['id','author']
   
class ExpertiseToolInline(admin.TabularInline):
    model = ExpertiseTool
    extra = 1
    fields = ['tool_name', 'tool_image', 'tool_url']

@admin.register(ExpertiseCategory)
class ExpertiseCategoryAdmin(admin.ModelAdmin):
    inlines = [ExpertiseToolInline]
    list_display = ['id','expertise',]
    
@admin.register(WorkExperience)
class WorkExperienceAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['id','author','company','position']
    
    
@admin.register(AcademicParticipation)
class AcademicParticipationAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['id','author','role','year']
    
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['id','author','project_name','year']
    
@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['id','author','title','year']