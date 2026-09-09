from django.urls import path

from .views import (
    author_info_view,
    post_view,
    author_studies_view,
    expertise_view,
    work_experience_view,
    academic_participation_view,
    project_view,
    publication_view,
)


urlpatterns = [
    path("author-info", author_info_view, name="author-information"),
    path("post", post_view, name="post"),
    path("author-studies", author_studies_view, name="author-studies"),
    path("expertise", expertise_view, name="expertise"),
    path("work-experience", work_experience_view, name="work-experience"),
    path("academic-participation", academic_participation_view, name="academic-participation"),
    path("project", project_view, name="project"),
    path("publication", publication_view, name="publication"),
]