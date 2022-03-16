import FormatString from "./FormatString";

class Validator {
  validPaymentName(value) {
    if (value.length <= 0) {
      return false;
    }

    let length = FormatString.halfLength(value);

    return length <= 24;
  }

  validAmount(value) {
    if (value > 0 && value < 100000000) {
      return true;
    }

    return false;
  }

  isString(value) {
    if (typeof value === "string") {
      return true;
    }
    return false;
  }

  isNotEmpty(value) {
    if (value !== "" && value !== null && typeof value !== "undefined") {
      return true;
    }
    return false;
  }

  atLeastOne(value) {
    if (this.isNotEmpty(value)) {
      if (value.length > 0) {
        return true;
      }
    }
    return false;
  }

  isInt(value) {
    return !isNaN(value);
  }

  validMultiOwers(value) {
    let valid = true;
    value.forEach((ower) => {
      if (!ower.ower || !this.isNotEmpty(ower.amount)) {
        valid = false;
        return false;
      }
    });
    return valid;
  }
  atLeastOneValue(value) {
    if (!value) {
      return false;
    }
    let objects = value.filter((object) => object.amount > 0);
    let amount = objects.reduce((prev, object) => {
      if (parseFloat(object.amount) > 0) {
        return prev + parseFloat(object.amount);
      } else {
        return prev + 0;
      }
    }, 0);

    if (amount > 0) {
      return true;
    }
    return false;
  }
}

export default Validator;
