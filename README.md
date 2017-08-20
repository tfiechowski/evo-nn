# Evo-NN : Evolutionary Neural Network

Evo-NN is an evolutionary layer built on top of [Synaptic](https://github.com/cazala/synaptic). It can be used to train neural networks using genetic algorithms.


## Database

It is possible to store data to the MySQL database.

The data will consist of sessions, generations and genomes.

#### Running Docker MySQL DB

Docker can be used for local developement, it is possible to run it with following command:

```
docker run --name mysql-evonn -v $(pwd)/brain//mysql-data:/var/lib/mysql -e MYSQL_USER=mysql -e MYSQL_PASSWORD=mysql -e MYSQL_DATABASE=evonn -e MYSQL_ROOT_PASSWORD=mysql -it -p 3306:3306 mysql
```