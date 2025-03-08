chmod +x ./encouragement_proj/run_compose.sh
chmod +x ./react_encouragement_frontend/run_encouragement_server.sh

cd  ./encouragement_proj
./run_compose.sh

cd ../react_encouragement_frontend
./run_encouragement_server.sh
