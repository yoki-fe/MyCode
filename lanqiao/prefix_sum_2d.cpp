#include<bits/stdc++.h>
using namespace std;

int tmap [100][100];
int pre[100][100];
int n,m,j;

int main()
{
    cin>>n>>m;
    for(int i=1;i<=n;i++)
        for(int k=1;k<=m;k++)
            cin>>tmap[i][k];
    
    //对 二维数组 进行预处理
    for(int i=1;i<=n;i++)
        for(int k=1;k<=m;k++)
            pre[i][k] = pre[i-1][k] + pre[i][k-1] - pre[i-1][k-1] + tmap[i][k];
    
    // for(int i=1;i<=n;i++)
    // {
    //     for(int k=1;k<=m;k++)
    //     {
    //         cout<<pre[i][k]<<' ';
    //     }
    //     cout<<'\n';
    // }
    
    cin>>j;
    for(int i=0;i<j;i++)
    {
        int r1,c1,r2,c2;
        cin>>r1>>c1>>r2>>c2;
        int result = pre[r2][c2] - pre[r1-1][c2] - pre[r2][c1-1] + pre[r1-1][c1-1];
        cout<<"result:"<<result<<'\n';
    }

    return 0;
}
