import path from 'path'

import test from 'ava'

import validateProtobuf from '..'

test.beforeEach(t => {
  const f = validateProtobuf({
    root: path.join(__dirname, 'fixtures/protos'),
    file: 'pkg/imported.proto',
    throws: false,
  })
  t.context.validate = f
})

test('valid', t => {
  const { validate } = t.context
  t.is(
    validate('WithImport', {
      required: '',
    }),
    null,
  )
})
