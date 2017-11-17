#include <node.h>
#include <v8.h>

using namespace v8;

void call(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    Local<Object> obj = Object::New(isolate);;
    obj->Set(String::NewFromUtf8(isolate, "message"), String::NewFromUtf8(isolate, "Allo allo!"));
    args.GetReturnValue().Set(obj);
}

void RegisterModule(Local<Object> exports) {
	NODE_SET_METHOD(exports, "call", call);
}

NODE_MODULE(modulename, RegisterModule);
