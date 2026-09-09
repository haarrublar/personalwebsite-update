from rest_framework import serializers
from taggit.serializers import TaggitSerializer, TagListSerializerField
from .models import (AcademicParticipation, AuthorInfo, Degree, ExpertiseCategory, ExpertiseTool, Post, Project, Publication, WorkExperience, AuthorPhotos)


class AuthorPhotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthorPhotos
        fields = ['id', 'photo']


class AuthorInfoSerializer(serializers.ModelSerializer):
    photos = AuthorPhotosSerializer(many=True, read_only=True)
    
    class Meta:
        model = AuthorInfo
        fields = [
            'author_name',
            'author_role',
            'author_email',
            'author_git_user',
            'author_country',
            'author_photo',
            'author_intro',
            'author_resume',
            'photos'
        ]


class PostSerializer(TaggitSerializer, serializers.ModelSerializer):
    author_details = AuthorInfoSerializer(
        source='author',
        read_only=True
    )
    tags = TagListSerializerField()

    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'image',
            'slug',
            'author',           
            'author_details',   
            'summary',
            'body',
            'tags',
            'status',
            'publish',
            'created',
            'updated',
        ]
        read_only_fields = ['created', 'updated']

class DegreeSerializer(serializers.ModelSerializer):
    author_details = AuthorInfoSerializer(
        source='author',
        read_only=True
    )
    
    degree_type_display = serializers.CharField(
        source='get_degree_type_display', 
        read_only=True
    )

    class Meta:
        model = Degree
        fields = [
            'id',
            'author',
            'author_details',
            'degree_type',
            'degree_type_display',
            'field_of_study',
            'university',
            'graduation_date',
            'is_current'
        ]
        
        
class ExpertiseToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpertiseTool
        fields = ['id', 'tool_name', 'tool_url', 'tool_image']
        


class ExpertiseCategorySerializer(serializers.ModelSerializer):
    author_details = AuthorInfoSerializer(
        source='author',
        read_only=True
    )
    
    subcategories = ExpertiseToolSerializer(many=True, read_only=True)

    class Meta:
        model = ExpertiseCategory
        fields = [
            'id',
            'author',
            'author_details',
            'expertise',
            'subcategories'
        ]

        
class WorkExperienceSerializer(serializers.ModelSerializer):
    author_details = AuthorInfoSerializer(
        source='author',
        read_only=True
    )

    class Meta:
        model = WorkExperience
        fields = [
            'id',
            'author',
            'author_details',
            'company',
            'position',
            'start_date',
            'end_date',
            'is_current',
            'country',
            'job_description'
        ]
        

class AcademicParticipationSerializer(serializers.ModelSerializer):
    author_details = AuthorInfoSerializer(
        source='studies',
        read_only=True
    )

    class Meta:
        model = AcademicParticipation
        fields = [
            'id',
            'author',         
            'author_details',  
            'role',
            'year',
            'event',
            'skills'
        ]


class ProjectSerializer(serializers.ModelSerializer):
    author_details = AuthorInfoSerializer(
        source='studies',
        read_only=True
    )

    class Meta:
        model = Project
        fields = [
            'id',
            'author',         
            'author_details',  
            'project_name',
            'year',
            'description',
            'skills'
        ]


class PublicationSerializer(serializers.ModelSerializer):
    author_details = AuthorInfoSerializer(
        source='studies',
        read_only=True
    )

    class Meta:
        model = Publication
        fields = [
            'id',
            'author',         
            'author_details',  
            'title',
            'participants',
            'role',
            'url',
            'journal',
            'year'
        ]
