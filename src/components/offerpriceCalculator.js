function offerPrice(money, off) {
    let getpercenIndex = off.indexOf('%');
    let offNumber = Number(off.substring(0, getpercenIndex));
    return Math.floor((money - ((money * offNumber) / 100)));
};
export default offerPrice