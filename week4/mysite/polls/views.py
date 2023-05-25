from typing import Any
from django.db import models
from django.http import  HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.views import generic
from .models import Question, Choice
from django.utils import timezone

#apis
from django.http import JsonResponse
from .models import Question,Choice

def polls_api(request):
    data_Que = Question.objects.all()
    data_Cho = Choice.objects.all()
    que_dic = [{'Question': obj.question_text, 'Tags': obj.tags } for obj in data_Que]
    cho_dic = [{ obj.choice_text : obj.votes } for obj in data_Cho]
    que_dic[0]["ChoiceVote"] = cho_dic
    # Create a new list to store the transformed data
    transformed_data = []

    # Iterate over the original data
    for item in que_dic:
    # Create a new dictionary to store the transformed item
        transformed_item = {
            "Question": item["Question"],
            "OptionVote": {},
            "Tags": [item["Tags"]]
        }
        
        # Extract the option votes from the "ChoiceVote" list and convert them into a dictionary
        for option_vote in item["ChoiceVote"]:
            option_name = list(option_vote.keys())[0]
            vote_count = option_vote[option_name]
            transformed_item["OptionVote"][option_name] = vote_count
    
        
        # Append the transformed item to the new list
        transformed_data.append(transformed_item)
        response_data = transformed_data
    return JsonResponse(response_data, safe=False)



class IndexView(generic.ListView):
    template_name = "polls/index.html"
    context_object_name = "latest_question_list"

    def get_queryset(self):
        return Question.objects.filter(pub_date__lte=timezone.now()).order_by("-pub_date")[:5]
    
class DetailView(generic.DetailView):
    model = Question
    template_name = "polls/detail.html"

    def get_queryset(self):
        return Question.objects.filter(pub_date__lte=timezone.now())

class ResultsView(generic.DetailView):
    model = Question
    template_name = "polls/results.html"

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST["choice"])
    except (KeyError, Choice.DoesNotExist):
        return render(
            request,
            "polls/detail.html",
            {
                "question" : question,
                "error_question" : "You didn't select a choice",
            },
        )
    else:
        selected_choice.votes += 1
        selected_choice.save()
        return HttpResponseRedirect(reverse("polls:results", args=(question_id,)))