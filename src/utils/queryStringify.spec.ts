import { assert } from 'chai'
import { queryStringify } from './queryStringify'

describe('queryStringify', function () {
  it('primitive values', function () {
    assert.equal(queryStringify({ zero: 0 }), 'zero=0')
    assert.equal(queryStringify({ positive: 12345 }), 'positive=12345')
    assert.equal(queryStringify({ negative: -9999 }), 'negative=-9999')
    assert.equal(queryStringify({ null: null }), 'null=null')
    assert.equal(queryStringify({ boolean: false }), 'boolean=false')
    assert.equal(queryStringify({ nan: NaN }), 'nan=NaN')
    assert.equal(queryStringify({ undefined }), 'undefined=undefined')

    assert.equal(
      queryStringify({ string: 'Привет!' }),
      'string=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82!',
    )
  })

  it('object with primitves', function () {
    const testObj = {
      key: 1,
      key2: 'test',
      key3: false,
      key4: true,
    }
    assert.equal(
      queryStringify(testObj),
      'key=1&key2=test&key3=false&key4=true',
    )
  })

  it('objects and arrays', function () {
    const testObj = {
      key1: [1, 2, 3],
      key2: { a: 1 },
      key3: { b: { d: 2 } },
      key4: { b: null },
    }
    assert.equal(queryStringify(testObj), 'key1[0]=1&key1[1]=2&key1[2]=3&key2[a]=1&key3[b][d]=2&key4[b]=null')
  })
})
