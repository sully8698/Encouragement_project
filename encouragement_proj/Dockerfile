FROM python:3.11-buster
WORKDIR /src
COPY ./requirements.txt .
RUN pip install -r requirements.txt
COPY . .
RUN chmod +x /src/run_compose.sh
CMD gunicorn --bind 0.0.0.0:8000 --workers 3 encouragement_proj.wsgi:application