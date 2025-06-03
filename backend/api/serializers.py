from rest_framework import serializers
from . import models
from django.contrib.auth.models import User

class ComunidadeSerializer(serializers.ModelSerializer):
    participando = serializers.SerializerMethodField()

    class Meta:
        model = models.Comunidade
        fields = '__all__'

    def get_participando(self, obj):
        user = self.context['request'].user
        return user in obj.participantes.all()

class EventoSerializer(serializers.ModelSerializer):
    participando = serializers.SerializerMethodField()

    class Meta:
        model = models.Evento
        fields = '__all__'

    def get_participando(self, obj):
        user = self.context['request'].user
        return user in obj.participantes.all()

class PostagemSerializer(serializers.ModelSerializer):
    autor = serializers.ReadOnlyField(source='autor.username')
    curtidas = serializers.SerializerMethodField()
    descurtidas = serializers.SerializerMethodField()
    minha_reacao = serializers.SerializerMethodField()
    class Meta:
        model = models.Postagem
        fields = [
            'id', 'texto', 'autor', 'comunidade', 'curtidas', 'descurtidas', 'minha_reacao',
            'create_at'
        ]

    def get_curtidas(self, obj):
        return obj.reacoes.filter(tipo='positivo').count()

    def get_descurtidas(self, obj):
        return obj.reacoes.filter(tipo='negativo').count()

    def get_minha_reacao(self, obj):
        user = self.context['request'].user
        if not user.is_authenticated:
            return None
        reacao = obj.reacoes.filter(usuario=user).first()
        return reacao.tipo if reacao else None

class CadastroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user
