#include <bits/stdc++.h>
using namespace std;
int arr[] = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20};
int n;
void print_subset(int n)
{
    for(int i=1;i<(1<<n);i++)
    {
        for(int j=0;j<n;j++)
        {
            if(i & (1<<j)) 
                cout<<arr[j];
        }
        cout<<'\n';
    }
}
int main()
{
    cin>>n;
    print_subset(n);



    return 0;
}