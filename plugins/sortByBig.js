
export default arr => {
    let max = 0;
    for(let i = 0; i< arr.length; i++){
        //外层循环一次，就拿arr[i] 和 内层循环arr.legend次的 arr[j] 做对比
        for(let j = i; j <arr.length; j++){
            if(new Date(arr[i]).getTime() < new Date(arr[j]).getTime()) {
                //如果arr[j]大就把此时的值赋值给最大值变量max
                max=arr[j];
                arr[j]=arr[i];
                arr[i]=max;
            }
        }
    }
    return arr;
}