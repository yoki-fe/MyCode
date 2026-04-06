#include <bits/stdc++.h>
using namespace std;
using ll=unsigned long long;

//int c[20];
int a,b;
string n;
ll ans;

void dfs(int idx,ll v)
{
    int i = n[idx] - '0';
    if(n[idx] != '\0')
    {
        int times = min(a,9-i);
        a-=times;
        dfs(idx+1,v*10+times+i);
        a+=times;

        if(b>i)
        {
            b-=i+1;
            dfs(idx+1,v*10+9);
            b+=i+1;
        }
    }
    else
    {
        ans = max(ans,v);
        return;
    }
}

int main()
{
    cin>>n>>a>>b;

    dfs(0,0);
    cout<<ans;

    return 0;
}