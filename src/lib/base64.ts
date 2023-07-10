const decodeBase64 = (data: string): string => {
  return Buffer.from(data, "base64").toString("utf-8");
};

const encodeBase64 = (data: string): string => {
  return Buffer.from(data).toString("base64");
};

export { decodeBase64, encodeBase64 };
