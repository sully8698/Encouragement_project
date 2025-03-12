Problem: Peoples mental health has become an important aspect in our modern age. All the random texts we get from politics, advertisment companies, scammers, and robots are a real downer. It is as if its a 50/50 chance you may get excited or let down if your phone buzzes.

Simple solution: A free service that sends you text of encouragement to start your day off on the right foot.



Steps to get the backend up on docker
 - from inside encouragement_proj
1) run ./run_compose.sh
    - this will build the docker image, start the container, and fill a sentence database

steps to get the frontend up on docker
  - from inside react_encouragement_frontend 
1) run ./run_encouragement_server.sh
    - this will build the docker image and stat the frontend container that can be hit at port 8090