#include<bits/stdc++.h>
using namespace std;

typedef pair<long long, long long> pl;
pl pairl[1000];
struct Comp{
    constexpr bool operator()(pl const &a, pl const &b){
        if(a.second == b.second) return a.first<b.first;
        return a.second<b.second;
    }
};

int main(){
    priority_queue<pl,vector<pl>,Comp>p;
    int n;
    cin>>n;
    for (int i = 0; i < n; i++)
    {
        cin>>pairl[i].first>>pairl[i].second;
        p.push(pairl[i]);
    }
    while(!p.empty()){
        cout<<p.top().first<<" "<<p.top().second<<endl;
        p.pop();
    }
}