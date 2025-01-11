from django.urls import path
from .views import AllSentences, SelectSentence


urlpatterns = [
    path('', AllSentences.as_view(), name='all_sentences'),
    path('<int:id>/', SelectSentence.as_view(), name='select_sentence')
]
