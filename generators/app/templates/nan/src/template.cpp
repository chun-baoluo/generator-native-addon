#include "functions.h"

using v8::FunctionTemplate;

NAN_MODULE_INIT(InitAll) {
	Nan::Set(target, Nan::New("call").ToLocalChecked(), Nan::GetFunction(Nan::New<FunctionTemplate>(call)).ToLocalChecked());
}

NODE_MODULE(<%= name %>, InitAll)
