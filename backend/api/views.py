from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from .models import (AuthorInfo, Post, Degree, ExpertiseCategory, WorkExperience, AcademicParticipation, Project, Publication)
from .serializer import (AuthorInfoSerializer, PostSerializer, DegreeSerializer, ExpertiseCategorySerializer, WorkExperienceSerializer, AcademicParticipationSerializer, ProjectSerializer, PublicationSerializer)


@api_view(['GET'])
@permission_classes([AllowAny])
def author_info_view(request):
    if request.method == 'GET':
        user = AuthorInfo.objects.all()
        serializer = AuthorInfoSerializer(user, many=True)
        return Response(serializer.data)

    
@api_view(['GET'])
@permission_classes([AllowAny])
def post_view(request):
    if request.method == 'GET':
        user = Post.objects.all()
        serializer = PostSerializer(user, many=True)
        return Response(serializer.data)

    
@api_view(['GET'])
@permission_classes([AllowAny])
def author_studies_view(request):
    if request.method == 'GET':
        user = Degree.objects.all()
        serializer = DegreeSerializer(user, many=True)
        return Response(serializer.data)



@api_view(['GET'])
@permission_classes([AllowAny])
def expertise_view(request):
    if request.method == 'GET':
        categories = ExpertiseCategory.objects.prefetch_related('subcategories').all()
        serializer = ExpertiseCategorySerializer(categories, many=True, context={'request': request})
        return Response(serializer.data)



@api_view(['GET'])
@permission_classes([AllowAny])
def work_experience_view(request):
    if request.method == 'GET':
        user = WorkExperience.objects.all()
        serializer = WorkExperienceSerializer(user, many=True)
        return Response(serializer.data)
    
    

@api_view(['GET'])
@permission_classes([AllowAny])
def work_experience_view(request):
    if request.method == 'GET':
        user = WorkExperience.objects.all()
        serializer = WorkExperienceSerializer(user, many=True)
        return Response(serializer.data)
    
    
@api_view(['GET'])
@permission_classes([AllowAny])
def academic_participation_view(request):
    if request.method == 'GET':
        user = AcademicParticipation.objects.all()
        serializer = AcademicParticipationSerializer(user, many=True)
        return Response(serializer.data)
    

@api_view(['GET'])
@permission_classes([AllowAny])
def project_view(request):
    if request.method == 'GET':
        user = Project.objects.all()
        serializer = ProjectSerializer(user, many=True)
        return Response(serializer.data)
    

@api_view(['GET'])
@permission_classes([AllowAny])
def publication_view(request):
    if request.method == 'GET':
        user = Publication.objects.all()
        serializer = PublicationSerializer(user, many=True)
        return Response(serializer.data)