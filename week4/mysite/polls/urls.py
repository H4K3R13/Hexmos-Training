from django.urls import path
from . import views
from .views import polls_api, create_question, polls_tag, polls
app_name = "polls"

urlpatterns = [
    path('api/polls_vote/<int:id>/',polls),
    path('api/polls_tags/',polls_tag),
    path('api/polls/', polls_api),
    path('api/question/', create_question),
    path("", views.IndexView.as_view(), name="index"),
    path("<int:pk>/", views.DetailView.as_view(), name="detail"),
    path("<int:pk>/results/", views.ResultsView.as_view(), name="results"),
    path("<int:question_id>/vote/", views.vote, name="vote"),
]


