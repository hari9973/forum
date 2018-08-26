from forumapp.models import *
from forumapp.views.serializers import *
from rest_framework import generics
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework.generics import CreateAPIView

class QuestionList(generics.ListCreateAPIView):
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        data = Questions.objects.values('id', 'question')
        return JsonResponse(list(data), safe=False)


class CreateQuestionView(CreateAPIView):
    serializer_class = CreateQuestion
    queryset = Questions.objects.all()
    def get_serializer_context(self):
        return {"user_id": self.request.user.id}

class CreateAnswerView(CreateAPIView):
    serializer_class = CreateAnswer
    queryset = Answer.objects.all()
    def get_serializer_context(self):
        return {"user_id": self.request}


def QuestionBody(request, pk):
    data = Questions.objects.values('body').get(id=pk)
    return JsonResponse(data)

class Answers(generics.ListCreateAPIView):
    def get(self, request, pk, *args, **kwargs):
        data = Answer.objects.values('answer').filter(question=pk)
        return JsonResponse(list(data), safe=False)


class AnswerList(generics.ListCreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
