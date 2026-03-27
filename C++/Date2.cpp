#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
using namespace std;
class Time
{
	int hour;
	int minute;
	int sec;
	
	public:
		void setTime(void);
		void showTime(void);

};

Time t;

int main(void)
{
	t.setTime();
	t.showTime();
	return 0;

}
void Time::setTime(void)
{
	cin >> t.hour;
	cin >> t.minute;
	cin >> t.sec;

}
void Time::showTime(void)
{
	cout << t.hour << ":" << t.minute << ":" << t.sec << endl;
}
