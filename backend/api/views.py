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
    def participar(self, request, pk=None):
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
    # def get_queryset(self):

    #     return queryset
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Evento desativado"}, status=status.HTTP_204_NO_CONTENT)

class PostagemView(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.PostagemSerializer
    # queryset = models.Evento.objects.filter(ativo=True)
    # def get_queryset(self):
    #     # p_usuario = self.request.query_params.get('servidor', None)
    #     p_comunidade = self.request.query_params.get('comunidade', None)
    #     if (p_comunidade):
    queryset = models.Postagem.objects.filter(ativo=True)
    #     else:
    #         queryset = models.Postagem.objects.filter(ativo=True)
    #     return queryset
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Postagem desativado"}, status=status.HTTP_204_NO_CONTENT)