from rest_framework import serializers
from . import models

class ComunidadeSerializer(serializers.ModelSerializer):
    participando = serializers.SerializerMethodField()

    class Meta:
        model = models.Comunidade
        fields = ['id', 'titulo', 'descricao', 'participando']

    def get_participando(self, obj):
        user = self.context['request'].user
        return user in obj.participantes.all()

class EventoSerializer(serializers.ModelSerializer):
    participando = serializers.SerializerMethodField()

    class Meta:
        model = models.Comunidade
        fields = ['id', 'titulo', 'descricao', 'participando']

    def get_participando(self, obj):
        user = self.context['request'].user
        return user in obj.participantes.all()

class PostagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Postagem
        fields = '__all__'
