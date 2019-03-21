import 'react-testing-library/cleanup-after-each'
import { processOptions } from './ResizeDirectionOptions';

test('Default resize direction options', () => {
    expect(processOptions()).toEqual({
        top: true,
        bottom: true,
        left: true,
        right: true,
    });
})

test('Overwrite specific direction option', () => {
    'top,bottom,left,right'.split(',').forEach(prop => {
        expect(processOptions({
            [prop]: false
        })).toEqual({
            top: true,
            bottom: true,
            left: true,
            right: true,
            [prop]: false,
        })
    });
})

test('Disable direction options', () => {
    expect(processOptions({
        disabled: true
    })).toEqual({
        top: false,
        bottom: false,
        left: false,
        right: false,
    });
});