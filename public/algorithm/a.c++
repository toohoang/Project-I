#include<bits/stdc++.h>
using namespace std;

string doSum(string a, string b)
{
    if(a.size() < b.size())
        swap(a, b);

    int j = a.size()-1;
    for(int i=b.size()-1; i>=0; i--, j--)
        a[j]+=(b[i]-'0');

    for(int i=a.size()-1; i>0; i--)
    {
        if(a[i] > '9')
        {
            int d = a[i]-'0';
            a[i-1] = ((a[i-1]-'0') + d/10) + '0';
            a[i] = (d%10)+'0';
        }
    }
    if(a[0] > '9')
    {
        string k;
        k+=a[0];
        a[0] = ((a[0]-'0')%10)+'0';
        k[0] = ((k[0]-'0')/10)+'0';
        a = k+a;
    }
    return a;
}

int main()
{
    string res;
    string a,b,s1,s2;
    cin>>a>>b;
    if(a.size()<b.size()){
        s1=a;s2=b;
    }
    else{
        s1=b;s2=a;
    }
    for (int i = s1.size()-1; i >= 0; i++)
    {   
        int x=1;
        int tmp = s1[i] - '0';
        string t;
        for (int j = 0; j < tmp; j++)
        {
            t=doSum(t,s2);
        }
        for (int  k = 1; k < x; k++)
        {
            t+='0';
        }
        
        res=doSum(res,t);
        x++;
    }
    cout<<res;
    
}
