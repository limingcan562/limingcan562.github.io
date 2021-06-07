
// 获取引用的md文件名字
export default context => {
    context.$getMdName = src => {
        const str1 = src.split('.md')[0];
        const str2 = str1.split('/');
        const filName = str2[str2.length - 1];
        return filName;
    }
}