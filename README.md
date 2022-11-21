# Install Docker
## Install Redis
### from Docker Image run redis by 
    1: run
    2: open Optional Settings
    3:Port: 6379
    4: Hostpath: localhost
## install mysql
    1: docker run -p 3307:3306 --name mysqlrun01 -e MYSQL_ROOT_PASSWORD=root -d mysql:oracle
## Setting DBeaver
    1: install DBeaver
    2: SSL => Use SSL checked
    3: Allow public key retrieval => ok