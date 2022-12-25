#include<stdio.h>
int main(){
    int n;
    scanf("%d",&n);
    for (int i = 1; i <= n; i++)
    {
        /* code */
        for (int j = 1; j <= n; j++)
        {
            if(i<=j) printf("%d",j);
            else printf("%d",i);
        }
        printf("\n");
    }
    
}