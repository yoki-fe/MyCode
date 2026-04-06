#include <bits/stdc++.h>
using namespace std;
int n;
string s;
string s_flag;
vector<string> arr;
int order[20];

void calc(int i)
{
    if(i == s.size())
    {
        arr.push_back(s_flag);
        cout<<s_flag<<'\n';
        return;
    }
    for(int k=0;k<s.size();k++)
    {
        if(order[k]==1) continue;
        order[k]=1;
        s_flag+=s[k];
        calc(i+1);
        order[k]=0;
        s_flag.pop_back();
    }
    return ;
}
int main()
{
    cin>>s;
    sort(s.begin(),s.end());

    calc(0);
    return 0;
}