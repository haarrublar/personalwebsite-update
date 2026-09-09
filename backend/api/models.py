from django.db import models
from django.utils import timezone
from django.urls import reverse
from taggit.managers import TaggableManager
from django.core.validators import FileExtensionValidator


class PublishedManager(models.Manager):
    """
    This django class manager ables the communication in between the Post in the DB, and the view. Access to the DB to get the published Post and retrieve that info.
    """
    def get_queryset(self):
        return super().get_queryset()\
            .filter(status=Post.Status.PUBLISHED)
            
            
            
class AuthorInfo(models.Model):
    author_name = models.CharField(max_length=50)
    author_role = models.CharField(max_length=100)
    author_email = models.EmailField(max_length=100)
    author_git_user = models.CharField(max_length=50)
    author_country = models.CharField(max_length=50)
    author_photo = models.ImageField(upload_to=None, height_field=None, width_field=None, max_length=None, unique=False)
    author_intro = models.TextField()
    author_resume = models.TextField()

    def __str__(self):
        return self.author_name
    
    class Meta:
        verbose_name_plural = "author info"


class AuthorPhotos(models.Model):
    author = models.ForeignKey(
        AuthorInfo, 
        on_delete=models.CASCADE, 
        related_name='photos'  
    )

    photo = models.ImageField(upload_to='author_photos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Photo for {self.author.author_name}"


class Post(models.Model):
    class Status(models.TextChoices):
        DRAFT = 'DF', 'Draft'
        PUBLISHED = 'PB', 'Published'

    title = models.CharField(max_length=250)
    created = models.DateTimeField(auto_now_add=True) 
    image = models.ImageField(upload_to=None, height_field=None, width_field=None, max_length=None, unique=False)
    updated = models.DateTimeField(auto_now=True)
    publish = models.DateTimeField(default=timezone.now)
    slug = models.SlugField(max_length=250, unique_for_date='publish')
    
    # Point directly to AuthorInfo model
    author = models.ForeignKey(
        AuthorInfo,
        on_delete=models.CASCADE,
        related_name='blog_posts',
        default=1
    )
    
    summary = models.TextField(max_length=250)
    tags = TaggableManager()
    body = models.TextField()
    status = models.CharField(
        max_length=2,
        choices=Status.choices,
        default=Status.DRAFT
    )

    objects = models.Manager()
    published = PublishedManager()

    class Meta:
        verbose_name_plural = "post"
        ordering = ['-publish']
        indexes = [
            models.Index(fields=['-publish'])
        ]

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('blog:post_detail', args=[
            self.publish.year,
            self.publish.month,
            self.publish.day,
            self.slug
        ])
        


class Degree(models.Model):
    DEGREE_CHOICES = [
        ('BS', "Bachelor's"),
        ('MS', "Master's"),
        ('PHD', 'PhD'),
        ('CERT', 'Certificate'),
    ]

    author = models.ForeignKey(
        'AuthorInfo', 
        on_delete=models.CASCADE, 
        related_name='degrees', 
        default=1
    )
    
    degree_type = models.CharField(max_length=10, choices=DEGREE_CHOICES)
    field_of_study = models.CharField(max_length=100)
    university = models.CharField(max_length=100)
    
    graduation_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)

    class Meta:
        ordering = ['-graduation_date']
        verbose_name_plural = "degrees"
    
    def __str__(self):
        return f"{self.get_degree_type_display()} in {self.field_of_study} ({self.university})"
    
    
class ExpertiseCategory(models.Model):
    expertise = models.CharField(max_length=100)
    author = models.ForeignKey(AuthorInfo, 
                               on_delete=models.CASCADE, related_name='expertise',
                               default=1)

    class Meta:
        verbose_name_plural = "expertise category"
        
    def __str__(self):
        return self.expertise
    
    def get_absolute_url(self):
        return reverse('expertise_category_detail', args=[str(self.id)])

class ExpertiseTool(models.Model):
    tool = models.ForeignKey(ExpertiseCategory, on_delete=models.CASCADE, related_name='subcategories')
    tool_name = models.CharField(max_length=100)
    tool_url = models.URLField(max_length=200)
    tool_image = models.FileField(upload_to="images/", validators=[FileExtensionValidator(['pdf', 'doc', 'svg', 'png','jpg'])])

    def __str__(self):
        return self.tool_name
    
class WorkExperience(models.Model):
    author = models.ForeignKey(AuthorInfo, 
                               on_delete=models.CASCADE, related_name='work_experiences',
                               default=1)
    company = models.CharField(max_length=250)
    position = models.CharField(max_length=300)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    country = models.CharField(max_length=100)
    job_description = models.TextField()

    class Meta:
        verbose_name_plural = "work experience"
        
    def __str__(self):
        return f"{self.company} ({self.start_date} - {self.end_date})"

class AcademicParticipation(models.Model):
    author = models.ForeignKey(AuthorInfo, 
                               on_delete=models.CASCADE, related_name='academic_participations',
                               default=1)
    role = models.CharField(max_length=100)
    year = models.IntegerField()
    event = models.TextField()
    skills = models.TextField(null=True, blank=True)

    class Meta:
        verbose_name_plural = "academic participation"
        
    def __str__(self):
        return f"{self.role} - {self.year}"

class Project(models.Model):
    author = models.ForeignKey(AuthorInfo, 
                               on_delete=models.CASCADE, related_name='projects',
                               default=1)
    project_name = models.CharField(max_length=250)
    year = models.IntegerField()
    description = models.TextField(null=True, blank=True)
    skills = models.TextField(null=True, blank=True)

    class Meta:
        verbose_name_plural = "project"
        
    def __str__(self):
        return f"{self.project_name} - {self.year}"

class Publication(models.Model):
    author = models.ForeignKey(AuthorInfo, 
                               on_delete=models.CASCADE, related_name='publications',
                               default=1)
    title = models.CharField(max_length=250)
    participants = models.CharField(max_length=250)
    role = models.CharField(max_length=250,null=True, blank=True)
    url = models.URLField(max_length=200)
    journal = models.CharField(max_length=250)
    year = models.IntegerField()

    class Meta:
        verbose_name_plural = "publication"
        
    def __str__(self):
         return f"{self.title} - {self.year}"