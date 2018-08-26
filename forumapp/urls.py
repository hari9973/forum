from django.urls import path
from forumapp.views.question_answer import *
from forumapp.views.auth import *
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path(r'api/questions/', QuestionList.as_view()),
    path(r'api/postquestion/', CreateQuestionView.as_view()),
    path(r'api/questionBody/<int:pk>', QuestionBody),
    path(r'api/answers/<int:pk>', Answers.as_view()),
    path(r'api/login/', obtain_jwt_token, name="authenticate_user"),
    path(r'api/signup/', CreateUserView.as_view(), name='add_user'),
    path(r'api/user/<username>/', SingleUserProfileView.as_view(), name='single_user_profile'),
    path(r'api/postanswer/', CreateAnswerView.as_view())
]
