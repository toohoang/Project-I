#include<bits/stdc++.h>
using namespace std;
int n,L,m;
string A[10001];
int count(int a){
    int count=0;
    while (a>0)
    {
        a/=10;
        count++;
    }
    return count;
}
int main(){
    cin>>n>>L>>m;
    string a;   
    for (int i = 0; i < n; i++)
        cin>>A[i];
        
    for(int i=0;i<L;i++)
        a.append("0");
    
    for(int i=1;i<=n+m;i++){
        int num=count(i);
        for (int i = 0; i < num; i++)
        {
            a.pop_back();
        }
        stringstream ss;
        ss<<i;
        string str=ss.str();
        a.append(str);
        cout<<a<<endl;
    }
}