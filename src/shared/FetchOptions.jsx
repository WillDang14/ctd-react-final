// "GET" and "DELETE" do not need payload
// only "POST" and "PATCH"

/* ============================================= */
function FetchOptions(method, token, payload) {
  //
  if (method.toUpperCase() === 'GET' || method.toUpperCase() === 'DELETE') {
    return {
      method: method.toUpperCase(),
      headers: { Authorization: token },
    };
  }

  return {
    method: method.toUpperCase(),
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
}

/* ============================================= */
export default FetchOptions;
