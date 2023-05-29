#!/bin/sh

terraform init 
terraform destroy -auto-approve
terraform apply -auto-approve
npm run start:dev
