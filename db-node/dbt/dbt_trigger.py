import sys

from run_dbt import download_dbt_deps, run_dbt_wrapper

DBT_PACKAGE_FILE = '/tmp/packages.yml'

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

    download_dbt_deps()

    build_params = ['build', '-s', model_name]
    exit_code = run_dbt_wrapper(build_params)
    sys.exit(exit_code)
