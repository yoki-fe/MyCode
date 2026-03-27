from pwn import *
import pickle

# 目标 IP 地址和端口
target_ip = '10.11.152.149'
target_port = 8080

def main():
    try:
        # 连接到目标服务
        conn = remote(target_ip, target_port)

        # 获取响应数据
        data = conn.recvall()

        print(f"Received data: {repr(data)}")

        # 关闭连接
        conn.close()

        try:
            # 将数据反序列化为 Python 对象
            result = pickle.loads(data)

            if hasattr(result, '__dict__') and 'flag' in result.__dict__:
                print(f"[+] Flag found: {result.flag}")
            else:
                print("[!] No flag found.")
        except Exception as e:
            print(f"Failed to deserialize data: {e}")

    except Exception as e:
        print(f"Connection error: {e}")

if __name__ == "__main__":
    main()