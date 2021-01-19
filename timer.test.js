import timer from './timer';
import {beforeEach} from '@jest/globals';
beforeEach(()=>{
    jest.useFakeTimers();
});

test('timer 测试', () => {
    const fn = jest.fn();
    timer(fn);
    jest.advanceTimersByTime(3000);
    expect(fn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(3000);
    expect(fn).toHaveBeenCalledTimes(2);
});
test('timer 测试2', () => {
    const fn = jest.fn();
    timer(fn);
    jest.advanceTimersByTime(3000);
    expect(fn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(3000);
    expect(fn).toHaveBeenCalledTimes(2);
});
