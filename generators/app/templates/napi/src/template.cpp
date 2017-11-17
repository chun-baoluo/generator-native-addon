#include <node_api.h>
#include <assert.h>

napi_value CreateObject(napi_env env, const napi_callback_info info) {
  napi_status status;
  napi_value msg;
  napi_value obj;
  
  status = napi_create_object(env, &obj);
  assert(status == napi_ok);

  status = napi_create_string_utf8(env, "Allo allo!", 10, &msg);
  assert(status == napi_ok);
  
  status = napi_set_named_property(env, obj, "message", msg);
  assert(status == napi_ok);

  return obj;
}

napi_value Init(napi_env env, napi_value exports) {
  napi_value new_exports;
  napi_status status = napi_create_function(env, "", NAPI_AUTO_LENGTH, CreateObject, nullptr, &new_exports);
  assert(status == napi_ok);
  return new_exports;
}

NAPI_MODULE(addon, Init)

