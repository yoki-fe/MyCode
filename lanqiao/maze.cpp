#include <bits/stdc++.h>
using namespace std;

int n,m;
int xa,ya,x2,y2;
int tmap[105][105];

int xt[4]={0,1,0,-1};
int yt[4]={1,0,-1,0};
int visite[105][105];
int ans = INT_MAX;

int step;
int pd(int x,int y)
{
  if(x>n || y>m || x<1 || y<1 || tmap[x][y]== 0 || visite[x][y] == 1) return 0;
  return 1;
}


void dfs(int x,int y)
{
  //x1
  if(x==x2 && y==y2)
  {
    ans = min(ans,step);
    return;
  }
  for(int i=0;i<4;i++)
  {
    int xp = x + xt[i];
    int yp = y + yt[i];
    if(!pd(xp,yp)) continue;
    
    visite[xp][yp] = 1;
    step++;

    dfs(xp,yp);

    visite[xp][yp] = 0;
    step--;

  }
}

int main()
{
  // 请在此输入您的代码
  cin>>n>>m;
  for(int i=1;i<=n;i++)
  {
    for(int j=1;j<=m;j++)
    {
      cin>>tmap[i][j];
    }
  }
  cin>>xa>>ya>>x2>>y2;
  visite[xa][ya] = 1;
  dfs(xa,ya);

  if(ans == INT_MAX) cout<<-1;
  else  cout<<ans;

  return 0;
}