from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from datetime import datetime, date, timedelta
from . import models
from . import serializers

class ComunidadeView(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.ComunidadeSerializer
    queryset = models.Comunidade.objects.filter(ativo=True)

    def get_serializer_context(self):
        # Inclui o request no contexto do serializer para acessar o usuário
        context = super().get_serializer_context()
        context.update({'request': self.request})
        return context

    @action(detail=True, methods=['post'])
    def participar_comunidade(self, request, pk=None):
        comunidade = self.get_object()
        comunidade.participantes.add(request.user)
        return Response({'detail': 'Você agora participa da comunidade.'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def sair_comunidade(self, request, pk=None):
        comunidade = self.get_object()
        comunidade.participantes.remove(request.user)
        return Response({'detail': 'Você saiu da comunidade.'}, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Comunidade desativada"}, status=status.HTTP_204_NO_CONTENT)
    
class EventoView(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.EventoSerializer
    queryset = models.Evento.objects.filter(ativo=True)
    def get_serializer_context(self):
        # Inclui o request no contexto do serializer para acessar o usuário
        context = super().get_serializer_context()
        context.update({'request': self.request})
        return context

    @action(detail=True, methods=['post'])
    def inscrever_evento(self, request, pk=None):
        evento = self.get_object()
        evento.participantes.add(request.user)
        return Response({'detail': 'Inscrição realizada.'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def sair_evento(self, request, pk=None):
        evento = self.get_object()
        evento.participantes.remove(request.user)
        return Response({'detail': 'Inscrição cancelada.'}, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'])
    def avaliar_evento(self, request, pk=None):
        evento = self.get_object()
        if (request.data.get('avaliar') == True):
            evento.react_positivo += 1
        else:
            evento.react_negativo += 1
        evento.save()
        return Response({'detail': 'Avaliação realizada.'}, status=status.HTTP_200_OK)

    #     return queryset
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Evento desativado"}, status=status.HTTP_204_NO_CONTENT)

class PostagemView(viewsets.ModelViewSet):
    serializer_class = serializers.PostagemSerializer
    queryset = models.Postagem.objects.filter(ativo=True)

    def get_serializer_context(self):
        # Inclui o request no contexto do serializer para acessar o usuário
        context = super().get_serializer_context()
        context.update({'request': self.request})
        return context
    
    @action(detail=True, methods=['post'])
    def avaliar_postagem(self, request, pk=None):
        postagem = self.get_object()
        if (request.data.get('avaliar') == True):
            postagem.react_positivo += 1
        else:
            postagem.react_negativo += 1
        postagem.save()
        return Response({'detail': 'Avaliação realizada.'}, status=status.HTTP_200_OK)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Postagem desativado"}, status=status.HTTP_204_NO_CONTENT)