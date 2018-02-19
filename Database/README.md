## MONGODB HELP

STEP 1
```bash
sudo lsof -t -i:27017
```


This will return the PID using the port.

STEP 2

```bash
sudo kill -2 PID
```

```bash
./mongod
```

OR 
Make use of alternate port
```bash
./mongod --port 27018
```

###  If nothing works follow as follow


uninstall completely
```bash
sudo service mongod stop
sudo apt-get purge mongodb-org*
sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongodb
```
Install mongo

```bash
sudo apt-get install mongodb
sudo apt-get update
sudo service mongodb start
``` 

verify installtion
```bash
mongo --version
```


Start mongo shell
```bash
mongo
```

If you get the below like
```bash
dbpath (/data/db) does not exist.
 Create this directory or give existing directory in --dbpath.
 See http://dochub.mongodb.org/core/startingandstoppingmongo
```

Execute the following after executing the command 
```bash
cd
```
Now execute the following command 
```bash
sudo mkdir -p /data/db/

sudo chown `id -u` /data/db
```

Run the server
```bash
mongod
```

You should get the following output
```bash
mongod --help for help and startup options
2018-02-19T21:28:43.727+0530 [initandlisten] MongoDB starting : pid=15127 port=27017 dbpath=/data/db 64-bit host=jarvis
2018-02-19T21:28:43.727+0530 [initandlisten] db version v2.6.10
2018-02-19T21:28:43.727+0530 [initandlisten] git version: nogitversion
2018-02-19T21:28:43.727+0530 [initandlisten] OpenSSL version: OpenSSL 1.0.2g  1 Mar 2016
2018-02-19T21:28:43.727+0530 [initandlisten] build info: Linux lgw01-12 3.19.0-25-generic #26~14.04.1-Ubuntu SMP Fri Jul 24 21:16:20 UTC 2015 x86_64 BOOST_LIB_VERSION=1_58
2018-02-19T21:28:43.727+0530 [initandlisten] allocator: tcmalloc
2018-02-19T21:28:43.727+0530 [initandlisten] options: {}
2018-02-19T21:28:43.763+0530 [initandlisten] journal dir=/data/db/journal
2018-02-19T21:28:43.763+0530 [initandlisten] recover : no journal files present, no recovery needed
2018-02-19T21:28:43.851+0530 [initandlisten] waiting for connections on port 27017
```

Done!!