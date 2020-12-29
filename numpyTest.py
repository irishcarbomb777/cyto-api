import json
import numpy as np

def numpyTest(event, context):
    a = np.arange(5)
    b = a[2]

    body = {
        "number":int(b)
    }

    return {
        "statusCode":200,
        "body" : json.dumps(body)
    }