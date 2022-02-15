FROM amazon/aws-lambda-python:3.9

COPY requirements.txt .
RUN pip3 install -r requirements.txt -t "${LAMBDA_TASK_ROOT}"
RUN yum install -y unzip

COPY profiles.yml dbt_project.yml *.py ${LAMBDA_TASK_ROOT}/
ENV DBT_PROFILES_DIR=${LAMBDA_TASK_ROOT}

# Copy git layer from https://github.com/lambci/git-lambda-layer
# Load extension layer described here https://aws.amazon.com/blogs/compute/working-with-lambda-layers-and-extensions-in-container-images/
# curl $(aws lambda get-layer-version-by-arn --arn arn:aws:lambda:us-east-1:553035198032:layer:git-lambda2:8 --query 'Content.Location' --output text --region us-east-1) --output layer.zip
COPY layer.zip .
RUN unzip layer.zip -d /opt
RUN rm layer.zip

CMD [ "dbt_trigger.run" ]
