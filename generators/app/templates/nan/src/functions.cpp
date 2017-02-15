#include "functions.h"

using namespace v8;

NAN_METHOD(call) {
    Local<Object> obj = Nan::New<Object>();
    obj->Set(Nan::New("message").ToLocalChecked(), Nan::New("Allo allo!").ToLocalChecked());

    info.GetReturnValue().Set(obj);
}
