#include<bits/stdc++.h>
using namespace std;

map<string,int>money_trans,check;
set<string>sort_account;
int stringTointeger(string str)
{
    int temp = 0;
    for (int i = 0; i < str.length(); i++) {
 
        // Since ASCII value of character from '0'
        // to '9' are contiguous. So if we subtract
        // '0' from ASCII value of a digit, we get
        // the integer value of the digit.
        temp = temp * 10 + (str[i] - '0');
    }
    return temp;
}
int main(){
    vector<int>v;
    string type;
    int total_money=0,number_transactions=0;
    do
    {   
        cin>>type;
        if(type == "#") continue;
        string account_1,account_2,money,time,atm;
        cin>>account_1>>account_2>>money>>time>>atm;
        check[account_1]++;
        total_money+=stringTointeger(money);
        
        sort_account.insert(account_1);
        sort_account.insert(account_2);
        
        
        number_transactions++;
        
    } 
    while (type != "#");
    
    do
    {
        cin>>type;
        if(type == "#") continue;
        if(type == "?number_transactions")
            cout<<number_transactions<<endl;

        else if(type=="?total_money_transaction")
            cout<<total_money<<endl;

        else if(type=="?list_sorted_accounts"){
            for(auto i:sort_account){
                cout<<i<<" "<<endl;
            }
        }

        else if(type=="?total_money_transaction_from"){
            string ac;
            cin>>ac;
            cout<<money_trans[ac]<<endl;
        }

        else if(type=="?inspect_cycle"){
            string a;int b;
            cin>>a>>b;
            if(check[a]==b) cout<<1<<endl;
            else cout<<0<<endl;
        }
    } 
    while (type != "#");
    cout<<endl;
    for (int i = 0; i < v.size(); i++)
    {
        cout<<v[i]<<" ";
    }
    
    return 0;
}