#include<bits/stdc++.h>
using namespace std;
typedef pair<int,int> ii;
map<int,ii>cou;
int main(){
    vector<int>a1,a2,x,y;
    int n,m;
    cin>>n>>m;
    
    for (int i = 0; i < n; i++)
        cin>>a1[i];
    for (int i = 0; i < m; i++)
        cin>>a2[i];

    if(n<m) {x=a1;y=a2;}
    else {x=a2;y=a1;}
    for (int i = 0; i < x.size(); i++)
    {
        cou[x[i]].first=1;
        cou[x[i]].second=i;
    }
    for (int i = 0; i < y.size(); i++)
    {
        if(cou[y[i]].first==1)
    }
    
    
    
}