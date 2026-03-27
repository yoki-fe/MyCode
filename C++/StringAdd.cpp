#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
using namespace std;	
int main()
{
	string s1 = "Hello,";
	string s2 = "World!";
	string s3 = s1 + s2;

	cout << s3 << endl;
	char s4[100] = "Hello, ";
	char s5[20] = "World!";	
	strcat(s4, s5);
	cout << s4 << endl;
	return 0;
}
