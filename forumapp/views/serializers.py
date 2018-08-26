from rest_framework import serializers
from forumapp.models import *
from django.utils import timezone

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = ('id', 'question')


class QuestionBodySerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = ('body')

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('id', 'answer')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","first_name","last_name","email"]


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Profile
        fields = ["id", "user"]


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "first_name", "last_name","password", "username"]

class ProfileCreateSerializer(serializers.ModelSerializer):
    user = UserCreateSerializer()
    class Meta:
        model = Profile
        fields = ["bio","user"]

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        password = user_data.pop('password')
        user = User.objects.create(**user_data)
        user.set_password(password)
        user.save()
        bio = validated_data.pop('bio')
        profile = Profile.objects.create(user=user, bio=bio)
        profile.save()
        return profile

class CreateQuestion(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = ["question", "body","profile"]
    def create(self, validated_data):
        data = self.data
        user_id = data['profile']
        question = Questions.objects.create(profile_id=user_id, **validated_data, time=timezone.now())
        return question

class CreateAnswer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["answer", "profile_id", "question_id"]
    def create(self, request, *args, **kwargs):
        data = self.initial_data
        ans = data['answer']
        profile = data['profile_id']
        question = data['question_id']
        answer = Answer.objects.create(profile_id=profile, question_id=question, answer=ans, time=timezone.now())
        return answer
