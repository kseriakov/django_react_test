from rest_framework.viewsets import ModelViewSet

from articles.models import Article
from articles.api.serializers import ArticleSerializer


class ArticleApiView(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
