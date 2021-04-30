class FormatString {
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
