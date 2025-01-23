docker compose up --build -d

sleep 8
docker exec encouragement_proj-api-1 python /src/manage.py makemigrations
sleep 3
docker exec encouragement_proj-api-1 python /src/manage.py migrate
sleep 3
docker exec -it encouragement_proj-api-1 python /src/load_sentences.py
