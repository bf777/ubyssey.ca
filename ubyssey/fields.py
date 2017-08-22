from dispatch.theme.exceptions import InvalidField, WidgetNotFound
from dispatch.theme.fields import (ModelField, CharField, TextField,
                                   DateTimeField, IntegerField, BoolField,
                                   ArticleField, ImageField, WidgetField)

from ubyssey.events.api.serializers import EventSerializer
from ubyssey.events.models import Event

class EventField(ModelField):

    type = 'event'

    model = Event
    serializer = EventSerializer
