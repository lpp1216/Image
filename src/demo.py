#!/usr/bin/python
import re
import requests

user_file = open('/Users/lpp/src/test/fonts.css','r')
lines = user_file.readlines()
for line in lines:
    arr = re.findall(r'[(](.*?)[)]', line)
    for item in arr:
        if "https" in item:
            f = requests.get(item)
            file_name = item.split('/')[-1]
            with open('/Users/lpp/src/test/fonts/' + file_name, 'wb') as fp:
                fp.write(f.content)
                fp.close()
                # print item
