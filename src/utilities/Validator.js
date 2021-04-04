class Validator {
  isString(value) {
    if (typeof value === 'string') {
      return true;
    }
    return false;
  };

  isNotEmpty(value) {
    if (value !== '' && value !== null && typeof value !== 'undefined') {
      return true;
    }
    return false;
  };

  atLeastOne(value) {
    if (this.isNotEmpty(value)) {
      if (value.length > 0) {
        return true
      }
    }
    return false
  }

  isInt(value) {
    return !isNaN(value);
  };

  validMultiOwers(value) {
    let valid = true
    value.forEach(ower => {
      if ((!ower.ower || !this.isNotEmpty(ower.amount))) {
        valid = false
        return false
      }
    })
    return valid
  }
}


export default Validator
