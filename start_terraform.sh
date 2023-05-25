#!/bin/sh

terraform init 
terraform apply -destroy -auto-approve
npm run start:dev
