#include <bits/stdc++.h>
using namespace std;

class solution{
public:
    vector<vector<int>> res;
    void solve(int i, vector<int>&arr, vector<int>&tmp, int target){
        if(target==0){
            res.push_back(tmp);
            return;
        }
        if(target<0) return ;
        if(i==arr.size()) return ;

        solve(i+1,arr,tmp,target);
        tmp.push_back(arr[i]);
        solve(i,arr,tmp,target-arr[i]);
        tmp.pop_back();
    }
    vector<vector<int>> combinationSum(vector<int>&a, int target){
        res.clear();
        vector<int>tmp;
        solve(0, a,tmp,target);
        return res;
    }
};