/*test('测试加法', () => {
    // toBe匹配器
    expect(10).toBe(10);
});
test('toBeCloseTo', () => {
    const firstNumber = 0.1;
    const secondNumber = 0.2;
    expect(firstNumber + secondNumber).toBeCloseTo(0.3);
});
test('toMatch', () => {
    const str = 'hello tom'
    expect(str).toMatch(/tom/);
});
test('toContain', () => {
    const arr = ['tom','bob','imooc']
    expect(arr).toContain('bob');
});*/
//异常情况的匹配器
const throwNewErrorFunc=()=>{
    throw new Error('this is a new Error')
}
test('toThrow', () => {
    expect(throwNewErrorFunc).toThrow('this is a new Error');
});