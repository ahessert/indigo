.RECIPEPREFIX = >
build-DbtLayer:
> docker build ./dbt -t layer_image
> docker run -dit --name layer layer_image
> docker cp layer:/opt/DbtLayer.zip ./dbt

# Reference for the layer pattern used.
# https://medium.com/egen/automating-aws-lambda-layer-creation-for-python-with-makefile-cde085ef61e2
