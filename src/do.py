#!/usr/bin/python
#coding:utf-8
import requests
import os
import re


def downloadone( url ):
    root = "/Users/lpp/src/test/down/"
    # 以/为分隔保留最后一段
    path = root + url.split("/")[-1]
    try:
        if not os.path.exists(root):
            os.mkdir(root)
        if not os.path.exists(path):
            r = requests.get(url)
            r.raise_for_status()
            # 使用with语句可以不用自己手动关闭已经打开的文件流
            with open(path,"wb") as f:
            # 开始写文件，wb代表写二进制文件
                f.write(r.content)
            print("爬取完成")
        else: 
            print("文件已存在")
    except Exception as e:
        print("爬取失败:" + str(e))


# user_file = open('/Users/lpp/src/test/fonts.css','r')
# lines = user_file.readlines()
# for line in lines:
#     arr = re.findall(r'[(](.*?)[)]', line)
#     for item in arr:
#         if "https" in item:
#             print item
#             f = requests.get(item)
#             file_name = item.split('/')[-1]
#             # with open('/Users/lpp/src/test/fonts/' + file_name, 'wb') as fp:
#                 # fp.write(f.content)
#                 # fp.close()
                
url = "https://static.crello.com/fonts/Geometria-Regular/Geometria-Regular.woff2"
downloadone( url )
