const getServiceAccount=()=>{
  try {
    const buf = Buffer.from(process.env.SERVICE_ACCOUNT, "base64"); // Ta-da
    return JSON.parse(buf);
  } catch (err) {
    console.warn("getServiceAccount", err.message, err.stack);
  }
};

module.exports = {
  getServiceAccount,
};
