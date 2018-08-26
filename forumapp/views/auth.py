from forumapp.models import *
from forumapp.views.serializers import *
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User

class CreateUserView(CreateAPIView):
    serializer_class = ProfileCreateSerializer
    permission_classes = {AllowAny}
    queryset = Profile.objects.all()

class SingleUserProfileView(ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]
    # lookup_field = 'pk'
    # queryset = Author.objects.all()
    def get_queryset(self):
        no = self.kwargs['username']
        d = User.objects.get(username=no)
        result = Profile.objects.filter(user_id=d.id)
        return result

