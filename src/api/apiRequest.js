const apiRequest = async (url = "", optionsObj = null) => {
  let errMsg = null;
  try {
    const res = await fetch(url, optionsObj);
    if (!res?.ok) throw Error("Please Reload App");
  } catch (err) {
    errMsg = err.message;
  } finally {
    return errMsg;
  }
};

export default apiRequest;
