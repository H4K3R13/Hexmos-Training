from django.contrib import admin
from .models import Question, Choice

#admin.site.register(Question)
admin.site.register(Choice)


#To download the CSV
from django.http import HttpResponse
import csv

def export_questions_to_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="question_table.csv"'

    writer = csv.writer(response)
    fields = [field.name for field in Question._meta.fields]

    writer.writerow(fields)
    for obj in queryset:
        writer.writerow([str(getattr(obj, field)) for field in fields])

    return response

class QuestionAdmin(admin.ModelAdmin):
    actions = [export_questions_to_csv]

admin.site.register(Question, QuestionAdmin)



