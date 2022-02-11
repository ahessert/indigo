
DBT_PACKAGE_FILE = '/tmp/test_packages.yml'

def run(event, context):
    print(event)

    model_name = event['modelName']

    packages = event['packageList']
    formmated_packages = ['  - git: ' + package for package in packages]
    formatted_yml = 'packages:\n' + '\n'.join(formmated_packages)

    print('\n', model_name, '\n')
    # print(formatted_yml)
    
    yml_file = open(DBT_PACKAGE_FILE, 'w+')
    yml_file.write(formatted_yml)
    yml_file.close()

    return { 
        'statusCode': 200,
        'body': 'Hello World!'
    }
