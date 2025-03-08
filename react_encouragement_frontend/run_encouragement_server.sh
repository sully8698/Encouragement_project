docker build -t encouragement-server .

docker run -d --name encouragement-front -p 8090:80 encouragement-server