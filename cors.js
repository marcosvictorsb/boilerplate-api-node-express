const whitelist = () => {
  const allowed = [
    /^http(s)?:\/\/(.*\.)?boilerplate.com.br(\/.*)?$/g,
  ];

  const dev = [
    /^http(s)?:\/\/(.*\.)?localhost(:[0-9]*)?(\/.*)?$/g,
  ];

  return process.env.NODE_ENV === 'production' ? allowed : [...allowed, ...dev];
};

module.exports = (request, response, next) => {
  const origin = request.header('origin') || request.header('Origin');
  if (origin && whitelist().filter((domain) => domain.test(origin)).length >= 1) {
    response.set('Access-Control-Allow-Origin', origin);
  }

  response.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
  response.set(
    'Access-Control-Allow-Headers',
    'Content-Type,Accept,Accept-Encoding,Accept-Language,X-Access-Token,X-Key,Authorization,X-request-Id,Prefer,X-Logged-Area'
  );
  next();
};
