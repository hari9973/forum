from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, null=True)

    def __str__(self):
        return self.user.id

class Questions(models.Model):
    question = models.CharField(max_length=200)
    body = models.TextField()
    time = models.DateTimeField()
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def __str__(self):
        return question


class Answer(models.Model):
    answer = models.TextField()
    time = models.DateTimeField()
    question = models.ForeignKey(Questions, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    def __str__(self):
        return question

