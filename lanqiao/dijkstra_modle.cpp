#include <bits/stdc++.h>
using namespace std;
/*
程序整体逻辑与目的：
    目的：给定一个起点，在一个非负有权图中找到从起点到每一个节点的最短路径
    维护两个数组：adj[n][] : 存储节点的邻接表 pair<int,int> : 权重，邻接节点
                 dist[n]  : 起点到 节点 n 的最短距离
                // pq 容器，在运行过程中存储维护过程中的临时 pair<int,int> ,存储起点到该节点的最短权重与该节点；
    维护方式：1.最短路径节点，标记为已经最短，对该节点的相邻节点进行松弛；
             2.松弛：从地点经过该节点到相邻节点的权重小于现在该节点的权重，则对该节点进行松弛；
    
*/
typedef pair<int,int> pii;
const int INF = 0x3f3f3f3f;
const int MAXN = 100005;
vector<pii> adj[MAXN];
int dist[MAXN];
int n,m;
void dijkstra(int src)
{
    fill(dist,dist+n+1,INF);
    priority_queue<pii,vector<pii>,greater<pii>> pq;
    pq.push(make_pair(0,src));
    dist[src] = 0;
    while(!pq.empty())
    {
        pii p = pq.top();
        pq.pop();
        int w = p.first;   //最短路径
        int u = p.second;  //已经visited的节点
        if(dist[u] < w) continue;

        for(int i=0;i<adj[u].size();i++)
        {
            //cout<<"!";
            int v = adj[u][i].second;   //邻接点
            int wt = adj[u][i].first;
            if(dist[v] > w+wt) 
            {
                dist[v] = w+wt;
                pq.push(make_pair(dist[v],v));
            }
        }
    }
}
int main()
{
    cin>>n>>m;
    for(int i=0;i<m;i++)
    {
        int u,v,w;
        cin>>u>>v>>w;
        adj[u].push_back(make_pair(w,v));
        adj[v].push_back(make_pair(w,u));
    }
    dijkstra(0);
    for(int i=0;i<n;i++)
    {
        cout<<dist[i]<<' ';
    }
    return 0;
} 