class FormatString {
  sliceToLength(string, maxLength, sub) {
    let str = string.toString()
    if (this.halfLength(str) > maxLength) {

      let realLength = 0
      let currentLength = 0
      for (let c of str) {
        if (currentLength <= maxLength) {
          if (c.match(/[\u4e00-\u9a05]/)) {
            currentLength += 2
            realLength += 1
          } else {
            currentLength += 1
            realLength += 1
          }
          if (currentLength >= maxLength) {
            return `${str.slice(0, realLength)}` + sub
          }
        } else {
          return `${str.slice(0, realLength)}` + sub
        }
      }

    } else {
      return str
    }
  };
  halfLength(value) {
    if (!value) { return 0 }
    let length = 0
    for (let c of value) {
      if (c.match(/[\u4e00-\u9a05]/)) {
        length += 2
      } else {
        length += 1
      }
    }
    return length;
  }
}

export default FormatString
