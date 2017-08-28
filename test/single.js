import path from 'path'

import test from 'ava'

import validateProtobuf from '..'

test.beforeEach(t => {
  const f = validateProtobuf({
    root: path.join(__dirname, 'fixtures/protos'),
    file: 'pkg/single.proto',
    throws: false,
  })
  t.context.validate = f
})

test('valid', t => {
  const { validate } = t.context
  t.is(
    validate('Single', {
      required: '',
    }),
    null,
  )
})

test('miss required', t => {
  const { validate } = t.context
  t.is(validate('Single', {}), 'required: string expected')
})

test('wrong string type', t => {
  const { validate } = t.context
  t.is(
    validate('Single', {
      required: 123,
    }),
    'required: string expected',
  )
  t.is(
    validate('Single', {
      required: '123',
      optional: 123,
    }),
    'optional: string expected',
  )
  t.is(
    validate('Single', {
      required: '',
      final_message: 123,
    }),
    'final_message: string expected',
  )
})

test('wrong integer type', t => {
  const { validate } = t.context
  t.is(
    validate('Single', {
      num: '',
      required: '',
    }),
    'num: integer expected',
  )
})

test('throws', t => {
  const validate = validateProtobuf({
    root: path.join(__dirname, 'fixtures/protos'),
    file: 'pkg/single.proto',
  })
  t.throws(() =>
    validate('Single', {
      num: '',
      required: '',
    }),
  )
})

test('keepCase = false', t => {
  const validate = validateProtobuf({
    root: path.join(__dirname, 'fixtures/protos'),
    file: 'pkg/single.proto',
    throws: false,
    keepCase: false,
  })
  t.is(
    validate('Single', {
      required: '',
      finalMessage: 1,
    }),
    'finalMessage: string expected',
  )
  // the following will be considered valid
  t.is(
    validate('Single', {
      required: '',
      final_message: 1,
    }),
    null,
  )
})
