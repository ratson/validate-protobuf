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
