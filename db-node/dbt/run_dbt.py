import sys
import logging

from typing import List

from dbt.logger import log_manager
from dbt.utils import ExitCodes

import dbt.main
import dbt.version


EXPECTED_DBT_VERSION = '1.0.1'

def download_dbt_deps():
    run_dbt_wrapper(["deps"])
    # Reset dbt logger before running build task
    log_manager._file_handler.reset()


def run_dbt_wrapper(args: List[str]) -> int:
    """Copy of DBT.main that also logs errors to sentries.
    It can also serve as a place to plug in other behaviors
    that can't be implemented directly in DBT.
    This will need to be updated if the DBT version is incremented.
    """

    assert dbt.version.__version__ == EXPECTED_DBT_VERSION, \
        "This script should only be used with DBT version "\
        f"{EXPECTED_DBT_VERSION}, got {dbt.version.__version__}. "\
        "If you're updating the DBT version, please ensure that "\
        "the wrapper script is updated to match `dbt.main:main`!"

    logger = logging.getLogger('dbt')
    
    try:
        logger.info("Running args %s", args)
        results, succeeded = dbt.main.handle_and_check(args)
        if succeeded:
            exit_code = ExitCodes.Success
        else:
            exit_code = ExitCodes.ModelError

            errors = []
            for result in results:
                if result.status == 'ERROR':
                    errors.append(result.error)

            if not errors:
                logger.error("DBT completed with an unknown error.")

    except KeyboardInterrupt:
        logger.info("ctrl-c")
        exit_code = ExitCodes.UnhandledError

    except SystemExit as e:
        exit_code = e.code

    except BaseException as e:
        logger.exception(str(e))

        exit_code = ExitCodes.UnhandledError

    return exit_code


if __name__ == '__main__':
    params = sys.argv[1:]
    exit_code = run_dbt_wrapper(params)
    sys.exit(exit_code)
