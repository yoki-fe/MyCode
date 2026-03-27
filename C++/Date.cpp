#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
using namespace std;
class Date {
	int hour;
	int minute;
	int second;
	public:
		void input() {
			cout << "请输入时间：";
			cin >> hour >> minute >> second;
			if (hour<0||hour>23)
			{
				cout << "输入的小时数不合法，重置为0" << endl;
				hour = 0;
			}
			else if (minute < 0 || minute>59)
			{
				cout << "输入的分钟数不合法，重置为0" << endl;
				minute = 0;
			}
			else if (second < 0 || second >59)
			{
				cout << "输入的秒数不合法，重置为0" << endl;
				second = 0;
			}
		}
		void output() {
			cout << "时间是：" << hour << "时" << minute << "分" << second << "秒" << endl;
		}
		void setTime();
		void showTime();
};
void Date::setTime()
{
	cout << "请输入时间：";
	cin >> hour >> minute >> second;
	if (hour < 0 || hour>23)
	{
		cout << "输入的小时数不合法，重置为0" << endl;
		hour = 0;
	}
	else if (minute < 0 || minute>59)
	{
		cout << "输入的分钟数不合法，重置为0" << endl;
		minute = 0;
	}
	else if (second < 0 || second >59)
	{
		cout << "输入的秒数不合法，重置为0" << endl;
		second = 0;
	}
}
void Date::showTime()
{
	cout << "时间是：" << hour << "时" << minute << "分" << second << "秒" << endl;
}
int main()
{
	Date t;
	Date* p;
	p = &t;
	p->input();
	p->output();
	p->setTime();
	p->showTime();
	return 0;
}
