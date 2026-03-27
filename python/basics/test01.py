import requests

def scan_dif(target_url,dir_list):
    found_list = []
    
    for dir_name in dir_list:
        try:
            full_url = f"{target_url}/{dir_name}"
            response = requests.get(full_url,timeout=3)
            print(f"正在尝试:{full_url}")
            if response.status_code == 200:
                print(f"[+]请求成功:{full_url}（状态码：{response.status_code}）")
                found_list.append(dir_name)
            else:
                print(f"[-]请求失败:{full_url}（状态码：{response.status_code}）")
        except requests.exceptions.RequestException:
            print(f"[-]请求失败")
    return found_list

if __name__=="__main__":
    target_url = "http://localhost:8000"
    dir_list={"index.html","index","backup.html"}
    found_list = scan_dif(target_url,dir_list)
    print(f"发现{len(found_list)}")