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
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


# GET 'api/polls_tag/?tags=tags1,tags2
def polls_tag(request):
    tags_c = request.GET.get('tags', '').split(',')
    #tags = request
    # Query questions based on the provided tags
    #questions = Question.objects.filter(tags__in=tags)
    questions = Question.objects.all()
    # Create the response data
    response_data = []
    for question in questions:
        tags_q = question.tags.split(',')
        if any(item in tags_c for item in tags_q):     
                choices = Choice.objects.filter(question=question)
                choice_dict = {choice.choice_text: choice.votes for choice in choices}
                question_dict = {
                    "Question": question.question_text,
                    "OptionVote": choice_dict,
                    "Tags": question.tags
                }
                response_data.append(question_dict)
        else :
            return JsonResponse({'message': 'Question Not Found'}, status=400)
    return JsonResponse(response_data, safe=False)



#POST 'api/question' API
@csrf_exempt
def create_question(request):
    if request.method == 'POST' :
        #parsing in coming data
        payload = json.loads(request.body.decode('utf-8'))
        #extracting data from json
        question_text = payload["Question"]
        option_vote = payload["OptionVote"]
        tags = payload.get('Tags', [])
        tags_string = ','.join(tags)
        #saving Question
        question = Question(question_text=question_text,pub_date=timezone.now(),tags=tags_string)
        question.save()
        #saving Choice
        for key,value in option_vote.items():
            choice = Choice(question=question, choice_text=key,  votes=int(value))
            choice.save()
        return JsonResponse({'message': 'Question created successfully'}, status=201)
    else:
        return JsonResponse({'message': 'Invalid request method'}, status=400)


# GET 'api/polls/' API
def polls_api(request):
    data_Que = Question.objects.all()
    que_list = []
    for que in data_Que:
        choices = Choice.objects.filter(question=que)
        choice_dict = {choice.choice_text: choice.votes for choice in choices}
        tags = que.tags.split(',')
        que_dict = {
            'Question': que.question_text,
            'OptionVote': choice_dict,
            'Tags': tags
        }
        que_list.append(que_dict)

        # Print or use que_list as desired
        response_data = que_list

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