
const formatStr=(str) => {
    return str.replace(/(<br\/>)/g, '\n').replace(/(<\/n>)/g, '\n').trim();
};
const zero=(value) => {
    if (value < 10) {
      return '0' + value;
    }
    return value;
}
const formatTime=(d) => {
    let date = new Date(d);
    let Y = date.getFullYear() + "-";
    let M = zero(date.getMonth()+1) + "-";
    let D = zero(date.getDate()) + " ";
    let h = zero(date.getHours()) + ":";
    let m = zero(date.getMinutes()) + ":";
    let s = zero(date.getSeconds());
    return Y + M + D + h + m + s;
}

export{
    formatStr,
    formatTime
}