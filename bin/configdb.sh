#!/bin/bash 

echo "Configuring database: monstersdb"

dropdb -U nodeuser monstersdb
createdb -U nodeuser monstersdb


psql -U node_user monstersdb < ./bin/sql/monsters.sql


echo "monstersdb Configured"