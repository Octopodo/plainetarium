import { ExtendedProps } from '.'
import { test, describe, expect } from 'vitest'

describe('ExtendedProps', () => {
  test('Create', () => {
    const props = new ExtendedProps('test', {
      prop1: { type: String, default: 'Hello' },
      prop2: { type: Number, default: 123 }
    })

    // Check if the properties were created correctly
    expect(props.name).toBe('test')
    expect(props.props['prop1'].type).toEqual(String)
    expect(props.props['prop1'].default).toEqual('Hello')
    expect(props.props['prop2'].type).toEqual(Number)
    expect(props.props['prop2'].default).toEqual(123)
    expect(props.order[0]).toBe('prop1')
    expect(props.order[1]).toBe('prop2')
  })

  test('Create empty', () => {
    const props = new ExtendedProps('empty')
    expect(props.name).toBe('empty')
    expect(props.props).toEqual({})
    expect(props.order).toEqual([])
  })
  // Test for add method
  test('Add', () => {
    const props = new ExtendedProps('test', {}, [])
    props.add('prop1', { type: String, default: 'Hello' })

    // Check if the property was added
    const compare = props.getProps()['prop1']
    expect(compare.type).toEqual(String)
    expect(compare.default).toEqual('Hello')
  })

  // Test for remove method
  test('Remove', () => {
    const props = new ExtendedProps(
      'test',
      { prop1: { type: String, default: 'Hello' } },
      ['prop1']
    )
    props.remove('prop1')

    // Check if the property was removed
    expect(props.getProps()['prop1']).toBeUndefined()
  })

  // Test for shift method
  test('Shift', () => {
    const props = new ExtendedProps('test', {
      prop1: { type: String, default: 'Hello' },
      prop2: { type: Number, default: 123 }
    })
    props.shift()

    // Check if the first property was removed
    expect(props.getProps()['prop1']).toBeUndefined()

    // Check if the second property still exists
    const compare = props.getProps()['prop2']
    expect(compare.type).toEqual(Number)
    expect(compare.default).toEqual(123)
  })

  // Test for pop method
  test('Pop', () => {
    const props = new ExtendedProps(
      'test',
      {
        prop1: { type: String, default: 'Hello' },
        prop2: { type: Number, default: 123 }
      },
      ['prop1', 'prop2']
    )
    props.pop()

    // Check if the last property was removed
    expect(props.getProps()['prop2']).toBeUndefined()

    // Check if the first property still exists
    const compare = props.getProps()['prop1']
    expect(compare.type).toEqual(String)
    expect(compare.default).toEqual('Hello')
  })

  // Test for insert method
  test('Insert', () => {
    const props = new ExtendedProps(
      'test',
      {
        prop1: { type: String, default: 'Hello' },
        prop2: { type: Number, default: 123 }
      },
      ['prop1', 'prop2']
    )
    props.insert('prop3', 1)

    // Check if the property was inserted at the correct position
    expect(props.order[1]).toBe('prop3')
  })

  // Test for unshift method
  test('Unshift', () => {
    const props = new ExtendedProps(
      'test',
      {
        prop1: { type: String, default: 'Hello' },
        prop2: { type: Number, default: 123 }
      },
      ['prop1', 'prop2']
    )
    props.unshift('prop3')

    // Check if the property was added at the beginning
    expect(props.order[0]).toBe('prop3')
  })

  // Test for clone method
  test('Clone', () => {
    const props = new ExtendedProps(
      'test',
      { prop1: { type: String, default: 'Hello' } },
      ['prop1']
    )
    const clonedProps = props.clone()

    // Check if the cloned object is not the same instance
    expect(clonedProps).not.toBe(props)

    // Check if the cloned object has the same properties
    expect(clonedProps.getProps()).toEqual(props.getProps())
  })

  // Test for reorder method
  test('Reorder', () => {
    const props = new ExtendedProps(
      'test',
      {
        prop1: { type: String, default: 'Hello' },
        prop2: { type: Number, default: 123 },
        prop3: { type: Boolean, default: true }
      },
      ['prop1', 'prop2', 'prop3']
    )

    // Reorder the properties
    props.reorder(['prop3', 'prop1', 'prop2'])

    // Check if the properties were reordered correctly
    expect(props.order[0]).toBe('prop3')
    expect(props.order[1]).toBe('prop1')
    expect(props.order[2]).toBe('prop2')

    // Check if the properties still have the correct values
    expect(props.getProps()['prop1'].type).toEqual(String)
    expect(props.getProps()['prop1'].default).toEqual('Hello')
    expect(props.getProps()['prop2'].type).toEqual(Number)
    expect(props.getProps()['prop2'].default).toEqual(123)
    expect(props.getProps()['prop3'].type).toEqual(Boolean)
    expect(props.getProps()['prop3'].default).toEqual(true)
  })

  test('Merge Cloned Props', () => {
    const props1 = new ExtendedProps('props1', {
      prop1: {
        type: String,
        default: 'default1',
        control: 'text',
        hideControl: true
      }
    })
    const props2 = new ExtendedProps('props2', {
      prop1: { type: Number, default: 0, control: 'range' },
      prop2: { type: Number, default: 2 }
    })

    const props3 = props2.clone()

    props1.merge(props3)
    expect(props1.props.prop2.type).toBe(Number)
    expect(props1.props.prop2.default).toBe(2)
  })

  // Test for merge method
  test('Merge Single Prop', () => {
    const props1 = new ExtendedProps(
      'test1',
      {
        prop1: { type: String, default: 'Hello' },
        prop2: { type: Number, default: 123 }
      },
      ['prop1', 'prop2']
    )

    const props2 = new ExtendedProps(
      'test2',
      {
        prop2: { type: Number, default: 456 },
        prop3: { type: Boolean, default: true }
      },
      ['prop2', 'prop3']
    )

    // Merge props2 into props1
    props1.mergeSingleProp(props2)

    // Check if the properties were merged correctly
    expect(props1.getProps()['prop1'].type).toEqual(String)
    expect(props1.getProps()['prop1'].default).toEqual('Hello')
    expect(props1.getProps()['prop2'].type).toEqual(Number)
    expect(props1.getProps()['prop2'].default).toEqual(456) // prop2 should be overwritten
    expect(props1.getProps()['prop3'].type).toEqual(Boolean)
    expect(props1.getProps()['prop3'].default).toEqual(true)

    // Check if the order of the properties is correct
    expect(props1.order[0]).toBe('prop1')
    expect(props1.order[1]).toBe('prop2')
    expect(props1.order[2]).toBe('prop3')
  })

  // Test for merge method
  test('Merge A', () => {
    const props1 = new ExtendedProps(
      'test1',
      {
        prop1: { type: String, default: 'Hello' },
        prop2: { type: Number, default: 123 }
      },
      ['prop1', 'prop2']
    )

    const props2 = new ExtendedProps(
      'test2',
      {
        prop2: { type: Number, default: 456 },
        prop3: { type: Boolean, default: true }
      },
      ['prop2', 'prop3']
    )

    const props3 = new ExtendedProps(
      'test3',
      {
        prop3: { type: Boolean, default: false },
        prop4: { type: String, default: 'World' }
      },
      ['prop3', 'prop4']
    )

    // Merge props2 and props3 into props1
    props1.merge(props2, props3)

    // Check if the properties were merged correctly
    expect(props1.getProps()['prop1'].type).toEqual(String)
    expect(props1.getProps()['prop1'].default).toEqual('Hello')
    expect(props1.getProps()['prop2'].type).toEqual(Number)
    expect(props1.getProps()['prop2'].default).toEqual(456) // prop2 should be overwritten by props2
    expect(props1.getProps()['prop3'].type).toEqual(Boolean)
    expect(props1.getProps()['prop3'].default).toEqual(false) // prop3 should be overwritten by props3
    expect(props1.getProps()['prop4'].type).toEqual(String)
    expect(props1.getProps()['prop4'].default).toEqual('World')

    // Check if the order of the properties is correct
    expect(props1.order[0]).toBe('prop1')
    expect(props1.order[1]).toBe('prop2')
    expect(props1.order[2]).toBe('prop3')
    expect(props1.order[3]).toBe('prop4')
  })

  test('Merge B', () => {
    const props1 = new ExtendedProps('props1', {
      prop1: {
        type: String,
        default: 'default1',
        control: 'text',
        hideControl: true
      }
    })
    const props2 = {
      prop1: { type: Number, default: 0, control: 'range' },
      prop2: { type: Number, default: 2 }
    }

    props1.merge(props2)

    expect(props1.props.prop1.type).toBe(Number)
    expect(props1.props.prop1.default).toBe(0)
    expect(props1.props.prop2.type).toBe(Number)
    expect(props1.props.prop2.default).toBe(2)
    expect(props1.props.prop1.control).toBe('range')
    expect(props1.props.prop1.hideControl).toBe(true)
  })

  test('Merge Hard', () => {
    const props1 = new ExtendedProps('props1', {
      prop1: {
        type: String,
        default: 'default1',
        control: 'text',
        hideControl: true
      }
    })
    const props2 = new ExtendedProps('props2', {
      prop1: { type: Number, default: 0 },
      prop2: { type: Number, default: 2 }
    })

    props1.mergeHard(props2)

    expect(props1.props.prop1.type).toBe(Number)
    expect(props1.props.prop1.default).toBe(0)
    expect(props1.props.prop2.type).toBe(Number)
    expect(props1.props.prop2.default).toBe(2)
    expect(props1.props.prop1.control).toBe('range')
    expect(props1.props.prop1.hideControl).toBe(false)
  })
})
