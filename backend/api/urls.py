from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'comunidade', views.ComunidadeView)
router.register(r'evento', views.EventoView)
router.register(r'postagem', views.PostagemView)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/cadastro/', views.CadastroView.as_view(), name='cadastro'),
]