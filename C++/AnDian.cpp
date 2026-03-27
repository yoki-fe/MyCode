#include <iostream>
#include <climits>
using namespace std;
int main() {
	int n;
	cout << "请输入方阵的阶数n：";
	cin >> n;
	int** arr = new int* [n];  
	for (int i = 0; i < n; i++) {
		arr[i] = new int[n];  
	}
	cout << "请输入" << n << "阶方阵的元素（每行" << n << " 个数)：" << endl;
	for (int i = 0; i < n; i++)
	{
		for (int k = 0; k < n; k++) {
			cin >> arr[i][k];
		}
	}
	bool flag = true;
	int x, y;
	for (int i = 0; i < n; i++)
	{
		int max=0;
		int index = 0;
		
		for (int k = 0; k < n; k++) {
			if (arr[i][k] > max)
			{
				max = arr[i][k];
				index = k;
			}
		}
		int k;
		for (k = 0; k < n; k++)
		{
			if(max > arr[k][index])
			{
				flag = false;
				break;
			}
		}
		x = i;
		y = index;
		break;
	}
	if (flag)
	{
		cout << x << "," << y;
	}
	else
	{
		cout << "No";
	}
}
