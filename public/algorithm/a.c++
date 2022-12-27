#include <bits/stdc++.h>
using namespace std;

int main() {
    int index, pos=0;
    string a="to cao to ot to taa";
    string b="to";
    int count=0;
    while((index=a.find(b,pos)) != string::npos){
        cout<<"position: "<<index<<endl;
        pos=index+1;
    }
    cout<<count;
    return 0;
}
