import socket
with socket.socket(socket.AF_INET,socket.SOCK_STREAM) as s:
    s.bind(("0.0.0.0",8888))
    s.listen()
    print("服务器已启动，监听 0.0.0.0:8888 ...")
    print("按 Ctrl+C 停止服务器\n")
    c,addr=s.accept()
    with c:
        print(addr,"connected.")
        while True:
            data = c.recv(1024)
            if not data:
                break
            c.sendall(data)