# validate-protobuf

Validate protobuf message object.

## Installation

```
npm install validate-protobuf --save
```

## Usage

<!-- eslint-disable strict -->

```js
const path = require('path')
const validateProtobuf = require('validate-protobuf')

const validate = validateProtobuf({
  root: path.join(__dirname, 'protos'),
  file: 'hello.proto',
})

validate({
  msg: 'Hello World',
})
```
