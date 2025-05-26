from django.db import models
from django.contrib.auth.models import User
    
class Comunidade(models.Model):
    titulo = models.CharField(max_length=200, null=False, blank=True)
    descricao = models.CharField(max_length=200, null=False, blank=True)
    foto = models.CharField(max_length=200, null=False, blank=True)
    ativo = models.BooleanField(default=True)
    participantes = models.ManyToManyField(User, related_name='comunidades_participando', blank=True)
    create_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.titulo
    
    def delete(self, *args, **kwargs):
        self.ativo = False
        self.save()
    
class Evento(models.Model):
    titulo = models.CharField(max_length=200, null=False, blank=True)
    descricao = models.CharField(max_length=200, null=False, blank=True)
    foto = models.CharField(max_length=200, null=False, blank=True)
    diaHora = models.DateTimeField(null=True)
    react_positivo = models.IntegerField(default=0, null=True, blank=True)
    react_negativo = models.IntegerField(default=0, null=True, blank=True)
    participantes = models.ManyToManyField(User, related_name='eventos_participando', blank=True)
    ativo = models.BooleanField(default=True)
    create_at = models.DateTimeField(auto_now_add=True, null=True)
    
    def __str__(self):
        return self.titulo
    
    def delete(self, *args, **kwargs):
        self.ativo = False
        self.save()

class Postagem(models.Model):
    texto = models.CharField(max_length=200, null=False, blank=True)
    autor = models.ForeignKey(User, on_delete=models.CASCADE, default=1, null=False)
    comunidade = models.ForeignKey(Comunidade, on_delete=models.SET_NULL, null=True, blank=True)
    react_positivo = models.IntegerField(default=0, null=True, blank=True)
    react_negativo = models.IntegerField(default=0, null=True, blank=True)
    ativo = models.BooleanField(default=True)
    create_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.autor + " - " + self.texto
    
    def delete(self, *args, **kwargs):
        self.ativo = False
        self.save()