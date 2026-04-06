#include <bits/stdc++.h>
using namespace std;
const int MAXN = 10005;
int n,m;

int arr[MAXN];
int pre[MAXN];
int d[MAXN];

int query(int l,int r)
{
    return pre[r] - pre[l-1];
}

int main()
{
    cin>>n;
    for(int i=1;i<=n;i++)
        cin>>arr[i];
    for(int i=1;i<=n;i++)
        pre[i] = pre[i-1]+arr[i];
    
    int l,r;
    cin>>l>>r;
    int j;
    cin>>j;

    cout<<"区间和："<<query(l,r)<<'\n';

    for(int i=1;i<=n;i++)
        d[i] = arr[i]-arr[i-1];

    d[l] += j;
    d[r+1] -= j;
    cout<<"区间值增加：";
    for(int i=1;i<=n;i++)
    {
        d[i] += d[i-1];
        cout<<d[i]<<' ';
    }
    return 0;
}
