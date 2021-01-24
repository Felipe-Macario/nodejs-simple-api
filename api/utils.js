function stringSlicer(toSlice) {
    var deleteUrl = toSlice;

    if (deleteUrl.slice(-1) === '/')
        return deleteUrl.slice(0, -1);
    else
        return deleteUrl;
}

module.exports = { stringSlicer };