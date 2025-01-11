from django.shortcuts import render
from rest_framework.views import APIView, Response
from .models import Sentence
from django.core.serializers import serialize
import json

# Create your views here.

class AllSentences(APIView):
    def get(self, request):
        all_sentences = Sentence.objects.order_by('genre')
        all_sentences_serialized = serialize("json", all_sentences)
        all_sentences_json = json.loads(all_sentences_serialized)

        return Response(all_sentences_json)
    
class SelectSentence(APIView):
    def get(self, request, id):
        sentence = Sentence.objects.get(id=id)
        sentence_serialized = serialize("json", [sentence])
        sentence_json = json.loads(sentence_serialized)

        return Response(sentence_json)
    
    def put(self, request, id):
        sentence = Sentence.objects.get(id=id)

        if 'sentence' in request.data:
            sentence.change_sentence(request.data['sentence'])
        
        sentence.save()
        sentence = json.loads(serialize("json", [sentence]))
        return Response(sentence)
        