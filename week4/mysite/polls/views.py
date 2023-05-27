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

# GET /polls/tags/
def poll_tags(request):
    tags = Question.objects.values_list('tags', flat=True).distinct()
    tag_list = [tag.split(',') for tag in tags]
    flattened_tags = [tag.strip() for sublist in tag_list for tag in sublist]
    unique_tags = list(set(flattened_tags))
    return JsonResponse({'Tags': unique_tags})

# PUT /polls/<id>/
@csrf_exempt
def polls(request, id):
    if request.method == 'PUT':
        try:
            question = Question.objects.get(pk=id)
        except Question.DoesNotExist:
            return JsonResponse({'message': 'Question not found'}, status=404)
        payload = json.loads(request.body.decode('utf-8'))
        increment_option = payload.get('incrementOption')

        try:
            choice = Choice.objects.get(question=question, choice_text=increment_option)
        except Choice.DoesNotExist:
            return JsonResponse({'message': 'Option not found'}, status=404)

        choice.votes += 1
        choice.save()

        return JsonResponse({'message': 'Option incremented'}, status=200)

    elif request.method == 'GET':
        try:
            question = Question.objects.get(pk=id)
            print(question)
        except Question.DoesNotExist:
            return JsonResponse({'message': 'Question not found'}, status=404)
        response_data = []
        tags_q = question.tags.split(',')
        choices = Choice.objects.filter(question=question)
        choice_dict = {choice.choice_text: choice.votes for choice in choices}
        question_dict = {
                    "Question": question.question_text,
                    "OptionVote": choice_dict,
                    "Tags": tags_q
            }
        print(question_dict)
        response_data = [question_dict] 
        return JsonResponse(response_data, safe=False) 

    return JsonResponse({'message': 'Invalid request'}, status=400)




# GET 'api/polls_tag/?tags=tags1,tags2
def polls_tag(request):
    tags_c = request.GET.get('tags', '').split(',')
    questions = Question.objects.all()
    response_data = []

    for question in questions:
        tags_q = question.tags.split(',')
        if any(item in tags_c for item in tags_q):
            choices = Choice.objects.filter(question=question)
            choice_dict = {choice.choice_text: choice.votes for choice in choices}
            question_dict = {
                "Question": question.question_text,
                "OptionVote": choice_dict,
                "Tags": tags_q
            }
            response_data.append(question_dict)

    if not response_data:  # If no questions match the tags
        return JsonResponse({'message': 'Question Not Found!'}, status=400)

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