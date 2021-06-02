import Vue from 'vue';

const abbr = {
    '1': 'Jan',
    '2': 'Feb',
    '3': 'Mar',
    '4': 'Apr',
    '5': 'May',
    '6': 'Jun',
    '7': 'Jul',
    '8': 'Aug',
    '9': 'Sept',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
};

export default context => {
    // console.log(context, 11);
    context.getEnglishMonth = month => {
        return abbr[month];
    }
}


// Vue.prototype.getEnglishMonth = month => {
//     return abbr[month];
// }