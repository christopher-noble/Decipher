export const formatTimestamp = (num: string) => {
    let result: string = '';
    if (num.indexOf('.') === 1) {
        result = num.replaceAll("[^0-9]", "").substring(0, 1);
    }
    else {
        result = num.replaceAll("[^0-9]", "").substring(0, 2);
    }
    return result;
}

export const youtubeParser = (url: any) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
}

export const rawCharacters = (string: string) => {
    return string.replaceAll(/[^a-zA-z]/g, "").toLowerCase();
}