#include <bits/stdc++.h>
using namespace std;

long long max_dist;
int farthest;  
int n;
vector<pair<int,int>> g[100005];
/*
    max_dist  最远距离
    farthest 最远距离的两端点的开始端点或者结束端点
*/

//从树的一端进行深搜，到达最远端

/*
    v 当前端点
    parent 父端点，防止回走
    dist 当前走过的距离


*/
void dfs(int v,int parent,int dist)
{
    if(dist>max_dist)
    {
        max_dist = dist;
        farthest = v;
    }
    for(int i=0;i<g[v].size();i++)
    {
        int node = g[v][i].first;
        int len = g[v][i].second;
        if(node != parent)
            dfs(node,v,dist+len);
    }
    /*
        在当前端点的邻接表中查找相邻的端点，进行搜索，遇到父节点跳过，防止原路返回，直到到达最根端点（没有分叉的端点）
    */
}

int main()
{
    cin>>n;
    for(int i=1;i<=n-1;i++)
    {
        int s_node;
        int e_node;
        int len;
        cin>>s_node>>e_node>>len;
        g[s_node].push_back({e_node,len});
        g[e_node].push_back({s_node,len});
    }

    // for(int i=1;i<=n-1;i++)
    // {
    //     for(int j=0;j<g[i].size();j++)
    //     {
    //         cout<<"{"<<g[i][j].first<<","<<g[i][j].second<<"} ";
    //     }
    //     cout<<'\n';
    // }

    dfs(1,0,0);
    max_dist = 0;
    dfs(farthest,0,0);
    
    int money=0;
    for(int i=1;i<=max_dist;i++)
        money+= i+10;
    
    cout<<money;
    return 0;
}